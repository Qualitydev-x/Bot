const {
    MessageFlags, Client, GatewayIntentBits, REST, Routes,
    SlashCommandBuilder, EmbedBuilder, ActionRowBuilder,
    ButtonBuilder, ButtonStyle,
    ModalBuilder, TextInputBuilder, TextInputStyle
} = require('discord.js');
const crypto = require('crypto');

const TOKEN = process.env.BOT_TOKEN || "PLACE_BOT_TOKEN_HERE";
const CLIENT_ID = "1513724173644730511";
const SERVER_URL = process.env.SERVER_URL || "https://rainx-server-v2-production.up.railway.app";
const BOT_SECRET = process.env.BOT_SECRET || "rainx-bot-secret";
const ENCRYPT_SECRET = process.env.ENCRYPT_SECRET || "pighub-encrypt-secret-xyz";
const OWNER_SECRET = process.env.OWNER_SECRET || "owner-secret-123";
const OWNER_ID = process.env.OWNER_ID || "1395634489404686379";
const PASTEFY_KEY = process.env.PASTEFY_KEY || "ccZFKS97zNu94petuhZaq9uWUq6rtypxMejTX0NyZRTNYZ0tRdbnwCevXquE";

const LICENSE_EXEMPT_COMMANDS = new Set(["addlicense", "renewlicense", "deletelicense", "licenseinfo"]);

async function serverGet(path) {
    const res = await fetch(`${SERVER_URL}${path}`, { headers: { "x-bot-secret": BOT_SECRET } });
    return res.json();
}
async function serverPost(path, body) {
    const res = await fetch(`${SERVER_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-bot-secret": BOT_SECRET },
        body: JSON.stringify(body)
    });
    return res.json();
}
async function serverDelete(path) {
    const res = await fetch(`${SERVER_URL}${path}`, { method: "DELETE", headers: { "x-bot-secret": BOT_SECRET } });
    return res.json();
}

const userKeyCache = new Map();
function getCachedKey(userId) {
    const c = userKeyCache.get(userId);
    if (!c || Date.now() > c.expireAt) return null;
    return c;
}
function setCachedKey(userId, key, data) {
    userKeyCache.set(userId, { key, data, expireAt: Date.now() + 60000 });
}
function clearCachedKey(userId) { userKeyCache.delete(userId); }

const ClientLoader = `
-- ====== DEVICE ID (fingerprint ใน Roblox เอง) ======
local _deviceId = "?"
local _startTime = false
do
    local _setupDone = _startTime
    pcall(function()
        _setupDone = true
        local _tutKey = "nil  nil  "
        local _charset = "qwertyuiopasdfghjklzxcvbnm098765"
        local _ugs = UserSettings():GetService("UserGameSettings")
        if not _ugs:GetTutorialState(_tutKey) then
            _deviceId = ""
            local _seed = (wait())[1] * 1000000
            local function _makeLcg(initial)
                local a, c, m = 1103515245, 12345, 99999999
                local state = initial % 2147483648
                local idx = 1
                return function(min, max)
                    local newState = a * state + c
                    local randVal = newState % m + idx
                    idx = idx + 1
                    state = randVal
                    c = newState % 4858 * (m % 5782)
                    return min + randVal % (max - min + 1)
                end
            end
            local _rng = _makeLcg(_seed - _seed % 1)
            _ugs:SetTutorialState(_tutKey, true)
            local _bi = 0
            for _ = 1, 16 do
                local bits, mult = 0, 1
                for _ = 1, 5 do
                    local bv = _rng(10, 20) > 15
                    _ugs:SetTutorialState(_tutKey .. _bi, bv)
                    bits = bits + (bv and 1 or 0) * mult
                    mult = mult * 2
                    _bi = _bi + 1
                end
                _deviceId = _deviceId .. _charset:sub(bits + 1, bits + 1)
            end
        else
            _deviceId = ""
            local _bi = 0
            for _ = 1, 16 do
                local bits, mult = 0, 1
                for _ = 1, 5 do
                    bits = bits + (_ugs:GetTutorialState(_tutKey .. _bi) and 1 or 0) * mult
                    mult = mult * 2
                    _bi = _bi + 1
                end
                _deviceId = _deviceId .. _charset:sub(bits + 1, bits + 1)
            end
        end
    end)
    while not _setupDone do end
end
_startTime = os.clock()

-- ====== LCG CHAIN ======
local function _lcgFactory(seed)
    local a, c, m = 1103515245, 12345, 99999999
    local state = seed % 2147483648
    local idx = 1
    return function(min, max)
        local newState = a * state + c
        local randVal = newState % m + idx
        idx = idx + 1
        state = randVal
        c = newState % 4859 * (m % 5781)
        return min + randVal % (max - min + 1)
    end
end

-- ====== CUSTOM HASH ======
local function _customHash(value)
    for _ = 1, 2 do
        local v1 = value % 9915 + 4
        local v2, v3
        for i = 1, 3 do
            v2 = value % 4155 + 3
            if i % 2 == 1 then v2 = v2 + 522 end
            v3 = value % 9996 + 1
            if v3 % 2 ~= 1 then v3 = v3 * 3 end
        end
        local v4 = value % 9999995 + 1 + 13729
        local v5 = value % 1000
        local v6 = math.floor((value - v5) / 1000) % 1000
        local v7 = v5 * v6 + v4 + value % (419824125 - v4 + v5)
        local v8 = value % (v1 * v2 + 9999) + 13729
        value = (v7 + (v8 + (v5 * v2 + v6)) % 999999 * (v4 + v8 % v3)) % 99999999999
    end
    return value
end

-- ====== VALIDATE STATE (table integrity check) ======
local _authState = -1
local _authTableStore = nil
local function _validateState(stateTable)
    local map1, map2, map3 = {}, {}, {}
    for i = 1, 13 do
        local key, val = {}, {}
        map1[key] = val
        map2[val] = i
        map3[key] = val
    end
    local sum1, sum2, count = 0, 0, 0
    if stateTable then
        map1 = stateTable[1]
        map2 = stateTable[2]
        map3 = stateTable[3]
    end
    for k, v in next, map1 do
        local mapped = map2[v]
        if map3[k] == v then sum1 = sum1 + 1 end
        count = count + 1
        sum2 = count % 2 == 0 and sum2 * mapped or sum2 + mapped + count
    end
    if sum1 ~= 13 then _authState = -1 end
    _authTableStore = {map1, map2, map3}
    _authState = sum2
    return false
end
_validateState()
while _authState == -1 do end

-- ====== HEARTBEAT COUNTER ======
local _heartbeatCounter = 0
local _heartbeatActive = false
local _heartbeat = game:GetService("RunService").Heartbeat
do
    local _active = false
    spawn(function()
        _active = true
        while true do
            _heartbeatCounter = _heartbeatCounter + 1
            _heartbeat:Wait()
        end
    end)
    while not _active do _heartbeat:Wait() end
end

local _lcg1 = _lcgFactory(_heartbeatCounter + _authState)

-- ====== ANTI-DEBUG httpRequest TRAP ======
local function _makeAntiDebugRequest(url)
    local _opts = { Method = "GET", Url = url }
    return request(_opts)
end

-- เช็ค กับ ก่อนทุกอย่างเลย ป้องกันทุก spoof method
do
    local _P = game:GetService("Players").LocalPlayer
    local function _earlykick(m)
        _P:Kick("[RainX] " .. m)
    end

    -- R0: เช็ค __index ของ fenv ว่า request ยัง native อยู่ไหม
    -- ป้องกัน rawset(..., "request", newcclosure(...)) bypass
    local _ok_r0, _fenv_r0 = pcall(getfenv)
    if _ok_r0 and _fenv_r0 then
        local _ok_r0b, _fmt_r0 = pcall(getrawmetatable, _fenv_r0)
        if _ok_r0b and _fmt_r0 then
            local _ok_r0c, _idx_r0 = pcall(rawget, _fmt_r0, "__index")
            if _ok_r0c and _idx_r0 and type(_idx_r0) == "table" then
                local _ok_r0d, _rq = pcall(rawget, _idx_r0, "request")
                if _ok_r0d and _rq ~= nil then
                    -- 1. iscclosure check
                    local _ok_r0e, _isC_r0 = pcall(iscclosure, _rq)
                    if _ok_r0e and not _isC_r0 then
                        _earlykick("R0") return
                    end
                    -- 2. pointer check - newcclosure สร้าง wrapper ใหม่ pointer ต่างกัน
                    if _rq ~= request then
                        _earlykick("R0b") return
                    end
                    -- 3. debug.info check - native C function ต้องเป็น [C]
                    if debug and debug.info then
                        local _ok_di, _src = pcall(debug.info, _rq, "s")
                        if _ok_di and _src ~= "[C]" then
                            _earlykick("R0c") return
                        end
                    end
                end
            end
        end
    end

    -- R1: getgenv __index request spoof
    local _ok_r1, _ge_r1 = pcall(getgenv)
    if _ok_r1 and _ge_r1 then
        local _ok_r1b, _gmt_r1 = pcall(getrawmetatable, _ge_r1)
        if _ok_r1b and _gmt_r1 then
            local _ok_r1c, _idx_r1 = pcall(rawget, _gmt_r1, "__index")
            if _ok_r1c and _idx_r1 and type(_idx_r1) == "table" then
                local _ok_r1d, _rq2 = pcall(rawget, _idx_r1, "request")
                if _ok_r1d and _rq2 ~= nil then
                    local _ok_r1e, _isC_r1 = pcall(iscclosure, _rq2)
                    if _ok_r1e and not _isC_r1 then
                        _earlykick("R1") return
                    end
                end
            end
        end
    end

    -- R2: request ใน fenv ต้องเป็น cclosure
    local _ok_r2, _isC_r2 = pcall(iscclosure, request)
    if _ok_r2 and not _isC_r2 then
        _earlykick("R2") return
    end

    -- R3: ถ้า request throw error แสดงว่าโดน override
    local _ok_r3 = pcall(function()
        local _test = request
        if type(_test) ~= "function" then error("bad") end
    end)
    if not _ok_r3 then _earlykick("R3") return end

    -- E0: เช็ค __index ของ fenv metatable
    -- ป้องกัน rawset(getrawmetatable(getfenv()).__index, "gethwid", ...)
    local _ok0, _fenv = pcall(getfenv)
    if _ok0 and _fenv then
        local _ok0b, _fmt = pcall(getrawmetatable, _fenv)
        if _ok0b and _fmt then
            local _ok0c, _idx = pcall(rawget, _fmt, "__index")
            if _ok0c and _idx and type(_idx) == "table" then
                local _ok0d, _gh = pcall(rawget, _idx, "gethwid")
                if _ok0d and _gh ~= nil then
                    local _ok0e, _isC0 = pcall(iscclosure, _gh)
                    if _ok0e and not _isC0 then
                        _earlykick("E0") return
                    end
                end
            end
        end
    end

    -- E1: gethwid ต้องเป็น cclosure
    local _ok1, _isC = pcall(iscclosure, gethwid)
    if _ok1 and not _isC then
        _earlykick("E1") return
    end

    -- E2/E3: เช็คใน getgenv
    local _ok2, _genv = pcall(getgenv)
    if _ok2 and _genv and _genv.gethwid then
        local _ok3, _isC2 = pcall(iscclosure, _genv.gethwid)
        if _ok3 and not _isC2 then
            _earlykick("E2") return
        end
        local _ok4, _hw1 = pcall(_genv.gethwid)
        local _ok5, _hw2 = pcall(gethwid)
        if _ok4 and _ok5 and _hw1 ~= _hw2 then
            _earlykick("E3") return
        end
    end

    -- E4: request ต้องเป็น cclosure
    local _ok6, _isC3 = pcall(iscclosure, request)
    if _ok6 and not _isC3 then
        _earlykick("E4") return
    end

    -- E5: เช็ค __index ของ getgenv metatable
    local _ok7, _ge = pcall(getgenv)
    if _ok7 and _ge then
        local _ok8, _gmt = pcall(getrawmetatable, _ge)
        if _ok8 and _gmt then
            local _ok9, _idx2 = pcall(rawget, _gmt, "__index")
            if _ok9 and _idx2 and type(_idx2) == "table" then
                local _ok10, _gh2 = pcall(rawget, _idx2, "gethwid")
                if _ok10 and _gh2 ~= nil then
                    local _ok11, _isC4 = pcall(iscclosure, _gh2)
                    if _ok11 and not _isC4 then
                        _earlykick("E5") return
                    end
                end
            end
        end
    end
end

local _S = "https://rainx-server-v2-production.up.railway.app"
local _HS = game:GetService("HttpService")
local _PS = game:GetService("Players")
local _CL = _PS.LocalPlayer

warn("[Makuro] กำลังโหลดโมดูล...")

local _rr = request
local _rg = gethwid
local _or = clonefunction(_rr)
local _og = clonefunction(_rg)
local _ow = clonefunction(warn)
local _owt = clonefunction(task.wait)
local _oc = clonefunction(os.clock)
local _oti = clonefunction(os.time)
local _op = clonefunction(pcall)
local _oip = clonefunction(ipairs)
local _ots = clonefunction(tostring)
local _orm = clonefunction(math.random)
local _off = clonefunction(string.format)
local _ogrmt = clonefunction(getrawmetatable)
local _oiro = clonefunction(isreadonly)
local _osr = setreadonly and clonefunction(setreadonly) or nil

local function _kick(m)
    for _ = 1, 30 do _ow(">> ได้แค่นี้หรอ:>") _owt(0.1) end
    _owt(0.3)
    _CL:Kick("[Makuro] " .. (m or "ได้แค่นี้หรอ:>"))
end

-- H1: hook detection
do
    if isfunctionhooked then
        local _fs = {request, gethwid}
        for _, f in _oip(_fs) do
            local ok, h = _op(isfunctionhooked, f)
            if ok and h == true then _kick("ได้แค่นี้หรอ:>") return end
        end
    end
end

-- H2: pointer integrity
do
    if request ~= _rr or gethwid ~= _rg then
        _kick("ได้แค่นี้หรอ:>") return
    end
end

-- H3: getgenv request hook
do
    local ok, genv = _op(getgenv)
    if ok and genv and genv.request and genv.request ~= _rr then
        _kick("H3") return
    end
end

-- H4: getgenv gethwid spoof (อีกรอบหลัง clone)
do
    local ok, genv = _op(getgenv)
    if ok and genv and genv.gethwid and genv.gethwid ~= _rg then
        _kick("ได้แค่นี้หรอ:>") return
    end
    local ok2, hw1 = _op(_og)
    local ok3, hw2 = _op(_rg)
    if ok2 and ok3 and hw1 ~= hw2 then
        _kick("H4") return
    end
end

-- T1: timing
do
    local t1 = _oc()
    local s = 0
    for i = 1, 50000 do s = s + i end
    local t2 = _oc()
    if (t2-t1) <= 0 or (t2-t1) > 60 then _kick("ได้แค่นี้หรอ:>") return end
end

-- M1: metatable integrity
do
    if isfunctionhooked then
        local ok, h = _op(isfunctionhooked, getrawmetatable)
        if ok and h == true then _kick("ได้แค่นี้หรอ:>") return end
    end
    local ok, mt = _op(_ogrmt, game)
    if ok and mt then
        local ok2, ro = _op(_oiro, mt)
        if ok2 and ro == false then _kick("ได้แค่นี้หรอ:>") return end
    end
end

-- M2: setreadonly pointer (เช็คเฉพาะถ้ามี setreadonly)
do
    if _osr and setreadonly then
        if isfunctionhooked then
            local ok, h = _op(isfunctionhooked, setreadonly)
            if ok and h == true then _kick("M2") return end
        end
    end
end

-- SC1: setclipboard ต้องเป็น cclosure
do
    if setclipboard then
        local ok, isC = _op(iscclosure, setclipboard)
        if ok and not isC then _kick("detected skid") return end
    end
end

-- SC2: setclipboard ถูก hook
do
    if setclipboard and isfunctionhooked then
        local ok, h = _op(isfunctionhooked, setclipboard)
        if ok and h == true then _kick("detected skid") return end
    end
end

-- SC3: getgenv setclipboard spoof
do
    local ok, genv = _op(getgenv)
    if ok and genv and genv.setclipboard then
        local ok2, isC = _op(iscclosure, genv.setclipboard)
        if ok2 and not isC then _kick("detected skid") return end
        if setclipboard and genv.setclipboard ~= setclipboard then
            _kick("detected skid") return
        end
    end
end

-- SC4: hook getgenv __index เพื่อ intercept setclipboard
do
    local ok, genv = _op(getgenv)
    if ok and genv then
        local ok2, gmt = _op(_ogrmt, genv)
        if ok2 and gmt then
            local ok3, idx = _op(rawget, gmt, "__index")
            if ok3 and idx and type(idx) == "table" then
                local ok4, sc = _op(rawget, idx, "setclipboard")
                if ok4 and sc ~= nil then
                    local ok5, isC = _op(iscclosure, sc)
                    if ok5 and not isC then _kick("detected skid") return end
                end
            end
        end
    end
end

-- SC5: override setclipboard ใน getgenv ป้องกัน content leak
do
    local ok, genv = _op(getgenv)
    if ok and genv then
        genv.setclipboard = function(...)
            _kick("detected skid")
        end
        local ok2, gmt = _op(_ogrmt, genv)
        if ok2 and gmt then
            local ok3, ro = _op(_oiro, gmt)
            if ok3 and _osr and not ro then
                _osr(gmt, true)
            end
        end
    end
end

-- SC6: ล็อค setclipboard ใน fenv __index ด้วย
do
    local ok, fenv = _op(getfenv)
    if ok and fenv then
        local ok2, fmt = _op(_ogrmt, fenv)
        if ok2 and fmt then
            local ok3, idx = _op(rawget, fmt, "__index")
            if ok3 and idx and type(idx) == "table" then
                rawset(idx, "setclipboard", function(...)
                    _kick("detected skid")
                end)
            end
        end
    end
end

-- RX: re-check request หลัง clone ทั้งหมด ป้องกัน late rawset
do
    -- เช็ค _rr (ต้นฉบับ) ยัง cclosure อยู่ไหม
    local ok, isC = _op(iscclosure, _rr)
    if ok and not isC then _kick("RX") return end
    -- เช็ค request ปัจจุบัน ยัง cclosure อยู่ไหม
    local ok2, isC2 = _op(iscclosure, request)
    if ok2 and not isC2 then _kick("RX2") return end
end

-- ====== LOCAL HWID CHECK (ไม่ส่งออก server) ======
-- hash HWID แล้วเก็บใน UserGameSettings ตรวจสอบได้โดยไม่ส่ง HWID ออกไป
do
    local _ugs = _op(function() return UserSettings():GetService("UserGameSettings") end)
    local _ok_ugs, _ugs_obj = _op(function() return UserSettings():GetService("UserGameSettings") end)
    if _ok_ugs and _ugs_obj then
        local _rawHwid = _og()
        -- สร้าง hash จาก HWID
        local _hwidHash = 0
        for i = 1, #_rawHwid do
            _hwidHash = (_hwidHash * 31 + string.byte(_rawHwid, i)) % 99999999
        end
        local _hkey = "hwid_h_"
        local _hkeySet = _hkey .. "set"
        local _maxBits = 26
        local _modVal = 67108864 -- 2^26

        local _ok_get, _isSet = _op(function()
            return _ugs_obj:GetTutorialState(_hkeySet)
        end)

        if _ok_get and _isSet then
            -- มีค่าเก็บอยู่แล้ว เอามาเทียบ
            local _stored = 0
            local _mult = 1
            for i = 0, _maxBits - 1 do
                local _ok_b, _bit = _op(function()
                    return _ugs_obj:GetTutorialState(_hkey .. i)
                end)
                if _ok_b and _bit then
                    _stored = _stored + _mult
                end
                _mult = _mult * 2
            end
            if _stored ~= _hwidHash % _modVal then
                _kick("HWID mismatch") return
            end
        else
            -- ยังไม่มี บันทึกครั้งแรก
            local _val = _hwidHash % _modVal
            for i = 0, _maxBits - 1 do
                _op(function()
                    _ugs_obj:SetTutorialState(_hkey .. i, _val % 2 == 1)
                end)
                _val = math.floor(_val / 2)
            end
            _op(function()
                _ugs_obj:SetTutorialState(_hkeySet, true)
            end)
        end
    end
end

warn("[Makuro] โหลดโมดูลสำเร็จ")
warn("[Makuro] กำลังเช็คสิทธิ์...")

local _hw = _og()
local _ky = _ots(getgenv().key or "")
if _ky == "" then _kick("ได้แค่นี้หรอ:>") return end

local _uid = _ots(_PS.LocalPlayer.UserId)
local _acc = _ots(math.floor(_PS.LocalPlayer.AccountAge or 0))

-- เพิ่ม deviceId + lcg hash เข้า fingerprint (ไม่ใช้ HWID ดิบ)
local _lcg2 = _lcgFactory(_heartbeatCounter + _lcg1(2, 4096))
local _r1 = _lcg1(100000, 1000000)
local _r2 = _lcg2(100000, 1000000)
local _fpHash = _customHash(_r1 + _r2 + _heartbeatCounter)
local _hwHash = 0
for i = 1, #_hw do _hwHash = (_hwHash * 31 + string.byte(_hw, i)) % 999999999 end
local _fp = _ots(_hwHash) .. _uid .. _acc .. (_deviceId or "?") .. tostring(_fpHash)

local function _nn()
    local h = ""
    for i = 1, 32 do h = h .. _off("%x", _orm(0, 15)) end
    return h
end

local _nc = _nn()
local _t1 = _oti()

local _ok1, _r1 = _op(function()
    return _or({
        Url = _S .. "/cdn-cgi/challenge",
        Method = "POST",
        Headers = {["Content-Type"] = "application/json"},
        Body = (function()
        local _hh = 0
        for i = 1, #_hw do _hh = (_hh * 31 + string.byte(_hw, i)) % 999999999 end
        return _HS:JSONEncode({key = _ky, hwid = _ots(_hh), ts = _t1, nonce = _nc})
    end)()
    })
end)

if not _ok1 or not _r1 or not _r1.Body then _kick("ได้แค่นี้หรอ:>") return end

local _d1 = _HS:JSONDecode(_r1.Body)
local _errs = {key="Key ไม่ถูกต้อง", exp="Key หมดอายุแล้ว", hwid="reset hwid ก่อน", rate="ช้าลงหน่อย"}
if not _d1 or _d1.e then
    warn("[Makuro] โหลดไม่สำเร็จ - " .. (_errs[_d1 and _d1.e] or "ข้อผิดพลาดที่ไม่รู้จัก"))
    for _ = 1, 30 do _ow(">> ได้แค่นี้หรอ:>") _owt(0.1) end
    _owt(0.3)
    _CL:Kick("[Makuro] " .. (_errs[_d1 and _d1.e] or "ได้แค่นี้หรอ:>"))
    return
end

if not _d1.s or not _d1.k then _kick("ได้แค่นี้หรอ:>") return end

local _t2 = _oti()

local _ok2, _r2 = _op(function()
    return _or({
        Url = _S .. "/cdn-cgi/token",
        Method = "POST",
        Headers = {["Content-Type"] = "application/json"},
        Body = (function()
        local _hh = 0
        for i = 1, #_hw do _hh = (_hh * 31 + string.byte(_hw, i)) % 999999999 end
        return _HS:JSONEncode({s = _d1.s, hwid = _ots(_hh), ts = _t2, nonce = _nc})
    end)()
    })
end)

if not _ok2 or not _r2 or not _r2.Body then _kick("ได้แค่นี้หรอ:>") return end

local _d2 = _HS:JSONDecode(_r2.Body)
if not _d2 then _kick("ได้แค่นี้หรอ:>") return end
if _d2.e then
    for _ = 1, 30 do _ow(">> ได้แค่นี้หรอ:>") _owt(0.1) end
    _owt(0.3)
    _CL:Kick("[Makuro] " .. (_errs[_d2.e] or "ได้แค่นี้หรอ:>"))
    return
end

if not _d2.d or not _d2.iv or not _d2.t then _kick("ได้แค่นี้หรอ:>") return end

local _at = nil
local _ok3, _plain = _op(function()
    return crypt.decrypt(_d2.d, _d1.k:sub(1, 32), _d2.iv, "GCM", _d2.t)
end)
if _ok3 and _plain then
    local _ok4, _pl = _op(function() return _HS:JSONDecode(_plain) end)
    if _ok4 and _pl then
        if _pl.ok == false then _kick("ได้แค่นี้หรอ:>") return end
        _at = _pl.activeToken
    end
end

if not game:IsLoaded() then game.Loaded:Wait() end
repeat task.wait() until game.Players.LocalPlayer and game.Players.LocalPlayer.PlayerGui and workspace
warn("[Makuro] โหลดสคริปต์สำเร็จ ✓")

if _at then
    -- ====== WEBSOCKET HEARTBEAT (แบบ Luarmor) ======
    local _wsInstance = nil
    local _wsReady = false
    local _wsClosing = false
    local _missedHeartbeats = 0
    local _heartbeatOk = false
    local _lastHeartbeatTime = 0

    -- ลอง connect WebSocket ก่อน ถ้าไม่ได้ fallback HTTP
    task.spawn(function()
        local _wsConnect = syn and syn.websocket and syn.websocket.connect
            or (WebSocket and WebSocket.connect)
            or nil
        if _wsConnect then
            local ok, ws = _op(_wsConnect, _S:gsub("https://", "wss://") .. "/cdn-cgi/ws")
            if ok and ws then
                _wsInstance = ws
                -- handle WS messages
                local _ok2 = _op(function()
                    ws.OnMessage:Connect(function(msg)
                        if msg == "PONG" then
                            _heartbeatOk = true
                            _lastHeartbeatTime = _oc()
                        end
                    end)
                    ws.OnClose:Connect(function()
                        _wsInstance = nil
                    end)
                end)
            end
        end
        _wsReady = true
    end)

    -- รอ WS ready (max 5s)
    local _wsWait = 0
    repeat _owt(0.1) _wsWait = _wsWait + 0.1 until _wsReady or _wsWait >= 5

    -- ====== 2-ROUND AUTH VALIDATION ======
    -- Round 1: validate activeToken + lcg hash
    local _round1Ok = false
    do
        local _rA = _lcg1(100000, 1000000)
        local _rB = _lcg2(100000, 1000000)
        local _hashCheck = _customHash(_rA + _rB + _heartbeatCounter)
        local _ok_r, _r = _op(function()
            return _or({
                Url = _S .. "/cdn-cgi/validate",
                Method = "POST",
                Headers = {["Content-Type"] = "application/json"},
                Body = _HS:JSONEncode({
                    token = _at,
                    hwid = (function() local _hh=0 for i=1,#_hw do _hh=(_hh*31+string.byte(_hw,i))%999999999 end return _ots(_hh) end)(),
                    h1 = tostring(_hashCheck),
                    h2 = tostring(_customHash(_rA + _heartbeatCounter)),
                    ts = _oti()
                })
            })
        end)
        if _ok_r and _r and _r.Body then
            local _ok2, _d = _op(function() return _HS:JSONDecode(_r.Body) end)
            if _ok2 and _d and _d.ok then
                _round1Ok = true
                -- Round 2: เช็ค hash ที่ server ส่งกลับมา
                local _expectedHash = tostring(_customHash(_hashCheck + (_d.seed or 0)))
                if _d.check ~= _expectedHash then
                    _CL:Kick("[Makuro] auth check failed")
                    return
                end
            end
        end
    end

    if not _round1Ok then
        _CL:Kick("[Makuro] auth failed")
        return
    end

    -- ====== HEARTBEAT LOOP (WS + HTTP fallback) ======
    task.spawn(function()
        local _missCount = 0
        local _stabilityCount = 0
        while not _wsClosing do
            _owt(20)
            local _tok = _oti()
            local _pingVal = _lcg1(1000, 99999) + _heartbeatCounter
            local _pongVal = _lcg2(1000, 99999) + _authFreezeCounter

            if _wsInstance then
                -- ส่งผ่าน WebSocket
                local _ok_ws = _op(function()
                    _wsInstance:Send(_HS:JSONEncode({
                        op = "PING",
                        token = _at,
                        hwid = (function() local _hh=0; for i=1,#_hw do _hh=(_hh*31+string.byte(_hw,i))%999999999 end; return _ots(_hh) end)(),
                        ts = _tok,
                        ping = _pingVal,
                        pong = _pongVal
                    }))
                end)
                -- รอ PONG 5s
                local _waited = 0
                local _prevOk = _heartbeatOk
                repeat _owt(0.1) _waited = _waited + 0.1 until _heartbeatOk ~= _prevOk or _waited >= 5
                if _heartbeatOk == _prevOk then
                    -- ไม่ได้ PONG = fallback HTTP
                    _wsInstance = nil
                end
            else
                -- HTTP fallback
                local _ok_h, _r_h = _op(function()
                    return _or({
                        Url = _S .. "/cdn-cgi/heartbeat",
                        Method = "POST",
                        Headers = {["Content-Type"] = "application/json"},
                        Body = _HS:JSONEncode({
                            hwid = (function() local _hh=0; for i=1,#_hw do _hh=(_hh*31+string.byte(_hw,i))%999999999 end; return _ots(_hh) end)(),
                            token = _at,
                            ts = _tok,
                            ping = _pingVal,
                            check = tostring(_customHash(_pingVal + _pongVal))
                        })
                    })
                end)
                if not _ok_h or not _r_h or not _r_h.Body then
                    _missCount = _missCount + 1
                else
                    local _ok2, _rj = _op(function() return _HS:JSONDecode(_r_h.Body) end)
                    if _ok2 and _rj and _rj.alive then
                        _heartbeatOk = true
                        _lastHeartbeatTime = _oc()
                        _missCount = 0
                        _stabilityCount = math.min(_stabilityCount + 1, 10)
                        -- เช็ค hash ที่ server ส่งกลับ
                        if _rj.check then
                            local _expectedPong = tostring(_customHash(_pingVal + _pongVal + (_rj.seed or 0)))
                            if _rj.check ~= _expectedPong then
                                _CL:Kick("[Makuro] heartbeat integrity failed")
                                break
                            end
                        end
                    else
                        _missCount = _missCount + 1
                        _stabilityCount = _stabilityCount - 2
                    end
                end

                if _missCount >= 3 or _stabilityCount <= 0 then
                    _CL:Kick("[Makuro] Session หมดอายุ")
                    break
                end
            end
        end
    end)
end

getgenv().__activeToken = _at
warn("[Makuro] เช็คสำเร็จ ✓")
warn("[Makuro] กำลังโหลดสคริปต์...")

-- ====== AUTH FUNCTION FREEZE (แบบ Luarmor) ======
-- ถ้า heartbeat หยุด หรือ validateState fail = freeze ทันที
local _authFrozen = false
local _authFreezeCounter = 0
task.spawn(function()
    while true do
        task.wait(0.18)
        -- เช็ค validateState ทุก 0.18s
        local _prevState = _authState
        _validateState(_authTableStore)
        if _authState == -1 then
            _authFrozen = true
            _CL:Kick("[Makuro] detected skid")
            break
        end
        -- เช็ค heartbeat counter ยังเดินอยู่ไหม
        local _prevCounter = _heartbeatCounter
        task.wait(0.1)
        if _heartbeatCounter == _prevCounter then
            _authFrozen = true
            _CL:Kick("[Makuro] detected skid")
            break
        end
        _authFreezeCounter = _authFreezeCounter + 1
    end
end)

-- authFunction1/2/3 ผูกกับ heartbeat + validateState
local function _authFunction1(x)
    if _authFrozen or _authState == -1 then while true do end end
    return _customHash(x + _heartbeatCounter) % 99999
end
local function _authFunction2(x)
    if _authFrozen or _authState == -1 then while true do end end
    return _customHash(x * _lcg1(1, 100) + _authFreezeCounter) % 99999
end
local function _authFunction3(x)
    if _authFrozen or _authState == -1 then while true do end end
    return (_customHash(x) + _heartbeatCounter) % 100 * (x % 10 + 1)
end

getgenv().__af1 = _authFunction1
getgenv().__af2 = _authFunction2
getgenv().__af3 = _authFunction3
`;

async function uploadToPastefy(content, title) {
    const res = await fetch("https://pastefy.app/api/v2/paste", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${PASTEFY_KEY}` },
        body: JSON.stringify({ content, title: title || "script", visibility: "UNLISTED" })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.paste?.raw_url || null;
}

async function obfuscate(scriptContent, scriptName) {
    try {
        const scriptRawUrl = await uploadToPastefy(scriptContent, scriptName + " - raw");
        if (!scriptRawUrl) return { success: false, stage: "pastefy upload script" };

        const loaderCode = ClientLoader + "\n\nlocal __url = \"" + scriptRawUrl + "\"\nloadstring(game:HttpGet(__url .. \"?t=\" .. (getgenv().__activeToken or \"\")))()";

        const res = await fetch("https://moonveil.cc/api/obfuscate", {
            method: "POST",
            headers: { "Authorization": "Bearer mv-secret-2502adb8-d1ec-40fd-9d76-e2a424bbb253", "Content-Type": "application/json" },
            body: JSON.stringify({
                script: loaderCode,
                options: {
                    cffEnable: true,
                    embedRuntime: true,
                    mangleEnable: true,
                    mangleGlobals: true,
                    mangleStrings: true,
                    prettify: false,
                    vmSafeEnv: true,
                    vmWrapScript: true
                }
            })
        });
        const rawText = await res.text();
        if (!res.ok || !rawText.trim()) return { success: false, stage: `obfuscate (${res.status}) - ${rawText.slice(0, 200)}` };

        const loaderUrl = await uploadToPastefy(rawText, scriptName + " - loader");
        if (!loaderUrl) return { success: false, stage: "pastefy upload loader" };

        return { success: true, url: loaderUrl };
    } catch (e) {
        return { success: false, stage: e.message };
    }
}

// ====== PER-GUILD CONFIG ======
const guildConfigs = {}; // { guildId: { projectName, setupUser, adminRoleId, hwidResetCooldownHours, scripts } }

function getGuildConfig(guildId) {
    if (!guildConfigs[guildId]) {
        guildConfigs[guildId] = {
            projectName: "RainX Hub",
            setupUser: "System",
            adminRoleId: null,
            hwidResetCooldownHours: null,
            scripts: {}
        };
    }
    return guildConfigs[guildId];
}

function getGuildScripts(guildId) { return getGuildConfig(guildId).scripts; }
function setGuildScript(guildId, name, url) { getGuildConfig(guildId).scripts[name] = url; }
function deleteGuildScript(guildId, name) { delete getGuildConfig(guildId).scripts[name]; }

// legacy global fallback (ไม่ใช้แล้ว แต่เก็บไว้กัน crash)
let scripts = {};

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

function isAdmin(member, guildId) {
    const cfg = getGuildConfig(guildId || member.guild?.id);
    return member.permissions.has("Administrator") || (cfg.adminRoleId && member.roles.cache.has(cfg.adminRoleId));
}

async function checkGuildLicense(guildId) {
    try {
        const res = await fetch(`${SERVER_URL}/guild/check/${guildId}`, { headers: { "x-bot-secret": BOT_SECRET } });
        return await res.json();
    } catch { return { ok: false, expired: true }; }
}

// Cache guild license ไว้ 60 วินาที ไม่ต้อง fetch ทุกครั้ง
const licenseCache = new Map();

async function checkGuildLicenseCached(guildId) {
    const cached = licenseCache.get(guildId);
    if (cached && Date.now() < cached.expireAt) return cached.result;
    const result = await checkGuildLicense(guildId);
    licenseCache.set(guildId, { result, expireAt: Date.now() + 60000 });
    return result;
}

async function requireLicense(interaction) {
    const result = await checkGuildLicenseCached(interaction.guildId);
    if (!result.ok) {
        const msg = { content: "❌ Server นี้ไม่มี License หรือ License หมดอายุแล้ว กรุณาติดต่อ Owner" };
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply(msg);
        } else {
            await interaction.reply({ ...msg, flags: MessageFlags.Ephemeral });
        }
        return false;
    }
    return true;
}

async function ownerPost(path, body) {
    const res = await fetch(`${SERVER_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-owner-secret": OWNER_SECRET },
        body: JSON.stringify(body)
    });
    return res.json();
}
async function ownerDelete(path) {
    const res = await fetch(`${SERVER_URL}${path}`, { method: "DELETE", headers: { "x-owner-secret": OWNER_SECRET } });
    return res.json();
}

function timeText(redeemedAt, duration) {
    if (duration === -1) return "♾️ ถาวร";
    if (!redeemedAt || redeemedAt === 0) return "⏳ ยังไม่ได้ใช้";
    const remaining = (redeemedAt + duration) - Math.floor(Date.now() / 1000);
    if (remaining <= 0) return "❌ หมดอายุแล้ว";
    return `${Math.floor(remaining/86400)}d ${Math.floor((remaining%86400)/3600)}h ${Math.floor((remaining%3600)/60)}m`;
}

function licenseTimeText(expiresAt) {
    if (expiresAt === -1) return "♾️ ถาวร";
    const remaining = expiresAt - Math.floor(Date.now() / 1000);
    if (remaining <= 0) return "❌ หมดอายุแล้ว";
    return `${Math.floor(remaining/86400)}d ${Math.floor((remaining%86400)/3600)}h ${Math.floor((remaining%3600)/60)}m`;
}

function getMainControlRow() {
    return new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("get_script").setLabel("🎮 Get Script").setStyle(ButtonStyle.Primary),
        new ButtonBuilder().setCustomId("redeem_key").setLabel("🔑 Redeem Key").setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId("reset_hwid").setLabel("🔄 Reset HWID").setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setCustomId("key_state").setLabel("📊 State").setStyle(ButtonStyle.Secondary)
    );
}

const commands = [
    new SlashCommandBuilder().setName("admin_role").setDescription("เลือกยศแอดมิน").addRoleOption(o => o.setName("role").setDescription("ยศ").setRequired(true)),
    new SlashCommandBuilder().setName("generate_key").setDescription("สร้างคีย์").addIntegerOption(o => o.setName("days").setDescription("วัน (0=ถาวร)").setRequired(true)).addIntegerOption(o => o.setName("amount").setDescription("จำนวน").setRequired(false)).addStringOption(o => o.setName("file").setDescription("ผูกกับไฟล์ (ไม่ระบุ = ใช้ได้ทุกไฟล์)").setRequired(false)),
    new SlashCommandBuilder().setName("deletekey").setDescription("ลบคีย์").addStringOption(o => o.setName("key_name").setDescription("คีย์").setRequired(true)),
    new SlashCommandBuilder().setName("keyinfo").setDescription("ดูข้อมูลคีย์").addStringOption(o => o.setName("key_name").setDescription("คีย์").setRequired(true)),
    new SlashCommandBuilder().setName("updatefile").setDescription("อัพโหลดสคริปต์").addStringOption(o => o.setName("name").setDescription("ชื่อ").setRequired(true)).addAttachmentOption(o => o.setName("file").setDescription(".lua/.txt").setRequired(true)),
    new SlashCommandBuilder().setName("deletefile").setDescription("ลบสคริปต์").addStringOption(o => o.setName("name").setDescription("ชื่อ").setRequired(true)),
    new SlashCommandBuilder().setName("listscripts").setDescription("รายชื่อสคริปต์"),
    new SlashCommandBuilder().setName("dashboard").setDescription("ภาพรวม"),
    new SlashCommandBuilder().setName("setup").setDescription("ตั้งค่าแผง").addStringOption(o => o.setName("project_name").setDescription("ชื่อโปรเจกต์").setRequired(true)),
    new SlashCommandBuilder().setName("sethwidresettime").setDescription("ตั้ง Cooldown HWID").addIntegerOption(o => o.setName("hours").setDescription("ชั่วโมง").setRequired(true)),
    new SlashCommandBuilder().setName("addlicense").setDescription("[Owner] เพิ่ม License ให้ Guild").addStringOption(o => o.setName("guild_id").setDescription("Guild ID").setRequired(true)).addIntegerOption(o => o.setName("days").setDescription("วัน (0=ถาวร)").setRequired(true)).addStringOption(o => o.setName("note").setDescription("โน้ต").setRequired(false)),
    new SlashCommandBuilder().setName("renewlicense").setDescription("[Owner] ต่ออายุ License").addStringOption(o => o.setName("guild_id").setDescription("Guild ID").setRequired(true)).addIntegerOption(o => o.setName("days").setDescription("วัน").setRequired(true)),
    new SlashCommandBuilder().setName("deletelicense").setDescription("[Owner] ลบ License").addStringOption(o => o.setName("guild_id").setDescription("Guild ID").setRequired(true)),
    new SlashCommandBuilder().setName("licenseinfo").setDescription("ดูสถานะ License ของ Server นี้"),
].map(c => c.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

client.once("ready", async () => {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log(`✅ Logged in as ${client.user.tag}`);
    const cfg = await serverGet("/config").catch(() => null);
    if (cfg?.config) {
        // restore per-guild configs
        if (cfg.config.guildConfigs) {
            for (const [gid, gcfg] of Object.entries(cfg.config.guildConfigs)) {
                guildConfigs[gid] = gcfg;
            }
        }
        console.log(`✅ Config restored (${Object.keys(guildConfigs).length} guilds)`);
    }
    setInterval(() => fetch(`${SERVER_URL}/ping`).catch(() => {}), 10 * 60 * 1000);
    // pre-warm license cache for all known guilds
    try {
        const guilds = client.guilds.cache;
        for (const [gid] of guilds) {
            checkGuildLicense(gid).then(r => licenseCache.set(gid, { result: r, expireAt: Date.now() + 60000 })).catch(() => {});
        }
    } catch {}
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (interaction.isChatInputCommand()) {
        const { commandName } = interaction;

        if (!LICENSE_EXEMPT_COMMANDS.has(commandName)) {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            if (!await requireLicense(interaction)) return;
        }

        if (commandName === "admin_role") {
            if (!interaction.deferred) await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            if (!interaction.member.permissions.has("Administrator")) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const role = interaction.options.getRole("role");
            const cfg = getGuildConfig(interaction.guildId);
            cfg.adminRoleId = role.id;
            await serverPost("/config", { guildConfigs });
            return interaction.editReply({ content: `✅ ตั้งยศแอดมินเป็น ${role}` });
        }

        if (commandName === "sethwidresettime") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const cfg = getGuildConfig(interaction.guildId);
            cfg.hwidResetCooldownHours = interaction.options.getInteger("hours");
            await serverPost("/config", { guildConfigs });
            return interaction.editReply({ content: `✅ HWID Cooldown = **${cfg.hwidResetCooldownHours} ชั่วโมง**` });
        }

        if (commandName === "generate_key") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const days = interaction.options.getInteger("days");
            const amount = Math.min(interaction.options.getInteger("amount") ?? 1, 50);
            const file = interaction.options.getString("file") || null;
            const duration = days === 0 ? -1 : days * 86400;
            const result = await serverPost("/keys/generate", { duration, amount, file });
            if (!result.ok) return interaction.editReply({ content: "❌ สร้างคีย์ไม่สำเร็จ" });
            const chunks = [];
            for (let i = 0; i < result.keys.length; i += 10) chunks.push(result.keys.slice(i, i + 10));
            const embed = new EmbedBuilder().setTitle("🔑 Key Generated").setColor(0x2ecc71)
                .addFields(
                    { name: "📦 จำนวน", value: String(amount), inline: true },
                    { name: "⏰ Duration", value: days === 0 ? "♾️ ถาวร" : `${days} วัน`, inline: true },
                    { name: "🎮 ไฟล์", value: file || "ทุกไฟล์", inline: true }
                );
            chunks.forEach((chunk, idx) => embed.addFields({ name: idx === 0 ? "🗝️ Keys" : "​", value: chunk.map(k => `\`${k}\``).join("\n") }));
            return interaction.editReply({ embeds: [embed] });
        }

        if (commandName === "deletekey") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const result = await serverDelete(`/keys/${interaction.options.getString("key_name")}`);
            return interaction.editReply({ content: result.ok ? `🗑️ ลบคีย์เรียบร้อย` : `❌ ไม่พบคีย์` });
        }

        if (commandName === "keyinfo") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const result = await serverGet(`/keys/${interaction.options.getString("key_name")}`);
            if (!result.ok) return interaction.editReply({ content: `❌ ไม่พบคีย์` });
            const d = result.data;
            return interaction.editReply({ embeds: [new EmbedBuilder().setTitle("🔍 Key Info").setColor(0xe67e22).addFields(
                { name: "🗝️ Key", value: `\`${result.key}\``, inline: false },
                { name: "✅ Active", value: String(d.active), inline: true },
                { name: "❌ Expired", value: String(d.expired), inline: true },
                { name: "⏰ Time Left", value: timeText(d.redeemedAt, d.duration), inline: true },
                { name: "▶️ Executions", value: String(d.executionCount || 0), inline: true },
                { name: "👤 Used By", value: d.usedBy ? `<@${d.usedBy}>` : "ยังไม่มี", inline: true },
                { name: "🖥️ HWID", value: d.hwid || "ยังไม่มี", inline: false }
            )] });
        }

        if (commandName === "updatefile") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const name = interaction.options.getString("name");
            const attachment = interaction.options.getAttachment("file");
            if (!attachment.name.endsWith(".lua") && !attachment.name.endsWith(".txt"))
                return interaction.editReply({ content: "❌ ต้องเป็น .lua หรือ .txt" });
            let scriptContent;
            try { const r = await fetch(attachment.url); scriptContent = await r.text(); }
            catch { return interaction.editReply({ content: "❌ ดาวน์โหลดไฟล์ไม่ได้" }); }
            await interaction.editReply({ content: "⏳ กำลัง Obfuscate..." });
            const result = await obfuscate(scriptContent, name);
            if (!result.success) return interaction.editReply({ content: `❌ ล้มเหลว: **${result.stage}**` });
            setGuildScript(interaction.guildId, name, result.url);
            await serverPost("/config", { guildConfigs });
            return interaction.editReply({ content: `✅ อัพโหลดสำเร็จ\n**ชื่อ**: \`${name}\`\n**URL**: ${result.url}` });
        }

        if (commandName === "deletefile") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const name = interaction.options.getString("name");
            const guildScripts = getGuildScripts(interaction.guildId);
            if (!guildScripts[name]) return interaction.editReply({ content: `❌ ไม่พบสคริปต์ชื่อ \`${name}\`` });
            deleteGuildScript(interaction.guildId, name);
            await serverPost("/config", { guildConfigs });
            return interaction.editReply({ content: `🗑️ ลบสคริปต์ \`${name}\` เรียบร้อย` });
        }

        if (commandName === "listscripts") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const names = Object.keys(getGuildScripts(interaction.guildId));
            if (names.length === 0) return interaction.editReply({ content: "📭 ไม่มีสคริปต์" });
            return interaction.editReply({ embeds: [new EmbedBuilder().setTitle("🎮 Scripts").setColor(0x5865F2).setDescription(names.map((n, i) => `**${i + 1}.** \`${n}\``).join("\n"))] });
        }

        if (commandName === "dashboard") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const cfg = getGuildConfig(interaction.guildId);
            const result = await serverGet("/keys");
            const values = Object.values(result.keys || {});
            // กรองเฉพาะ key ของ guild นี้
            const guildValues = values.filter(v => !v.guildId || v.guildId === interaction.guildId);
            const totalExec = guildValues.reduce((a, v) => a + (v.executionCount || 0), 0);
            const expiredCount = guildValues.filter(v => v.expired).length;
            const buyerCount = guildValues.filter(v => v.usedBy && v.usedBy !== "").length;
            const guildScripts = getGuildScripts(interaction.guildId);
            const scriptList = Object.keys(guildScripts);
            const loaderScript = scriptList.length > 0
                ? `loadstring(game:HttpGet('${guildScripts[scriptList[0]]}'))()`
                : "ยังไม่มีสคริปต์";
            const embed = new EmbedBuilder()
                .setTitle(`${cfg.projectName} Dashboard - Project Overview`)
                .setColor(0x5865F2)
                .addFields(
                    { name: "🟦 Project Name", value: cfg.projectName, inline: false },
                    { name: "🟧 All Execute Count", value: String(totalExec), inline: false },
                    { name: "🟧 Buyer", value: String(buyerCount), inline: false },
                    { name: "🟨 Expired", value: expiredCount > 0 ? `⚠️ ${expiredCount} keys expired` : "✅ No expired keys", inline: false },
                    { name: "🟦 Buyer Role", value: cfg.adminRoleId ? `<@&${cfg.adminRoleId}>` : "@unknown-role", inline: false },
                    { name: "🔗 Loader", value: `\`\`\`lua\n${loaderScript}\n\`\`\``, inline: false }
                )
                .setFooter({ text: `Dashboard Whitelist System | Made by ${cfg.projectName} • Today` });
            const row1 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("dash_genkey").setLabel("Generate Key").setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("dash_removekey").setLabel("Remove Key").setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("dash_searchkey").setLabel("Search Key").setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("dash_hwidcooldown").setLabel("HWID Cooldown").setStyle(ButtonStyle.Secondary)
            );
            const row2 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("dash_loader").setLabel("Loader").setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("dash_accessrole").setLabel("Access Role").setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("dash_renewtime").setLabel("Renew Time").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("dash_unusedkeys").setLabel("Get Unused Keys").setStyle(ButtonStyle.Secondary)
            );
            return interaction.editReply({ embeds: [embed], components: [row1, row2] });
        }

        if (commandName === "setup") {
            if (!interaction.member.permissions.has("Administrator")) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const cfg = getGuildConfig(interaction.guildId);
            cfg.projectName = interaction.options.getString("project_name");
            cfg.setupUser = interaction.member.displayName;
            await serverPost("/config", { guildConfigs });
            await interaction.channel.send({
                embeds: [new EmbedBuilder().setTitle(`${cfg.projectName} Control Panel`).setDescription("ยินดีต้อนรับ! เลือกรายการด้านล่าง").setColor(0x5865F2).setFooter({ text: `Setup by ${cfg.setupUser}` })],
                components: [getMainControlRow()]
            });
            return interaction.editReply({ content: "✅ ตั้งค่าแผงเรียบร้อย!" });
        }
    }

    if (interaction.isButton()) {
        // ปุ่มที่ต้อง showModal ห้าม defer ก่อน
        const modalButtons = new Set(["dash_searchkey", "dash_hwidcooldown", "dash_accessrole", "redeem_key"]);

        if (!modalButtons.has(interaction.customId)) {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        }

        // เช็ค license หลัง defer แล้ว
        const licResult = await checkGuildLicenseCached(interaction.guildId);
        if (!licResult.ok) {
            const msg = { content: "❌ Server นี้ไม่มี License หรือ License หมดอายุแล้ว" };
            if (interaction.deferred) return interaction.editReply(msg);
            return interaction.reply({ ...msg, flags: MessageFlags.Ephemeral });
        }

        if (interaction.customId === "dash_genkey") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            return interaction.editReply({ content: "ใช้คำสั่ง /generate_key ครับ ตัวอย่าง: /generate_key days:1 amount:1" });
        }

        if (interaction.customId === "dash_removekey") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            return interaction.editReply({ content: "ใช้คำสั่ง `/deletekey key_name:xxx` ครับ" });
        }

        if (interaction.customId === "dash_searchkey") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.reply({ content: "❌ คุณไม่มีสิทธิ์", flags: MessageFlags.Ephemeral });
            return interaction.showModal(new ModalBuilder().setCustomId("search_key_modal").setTitle("Search Key")
                .addComponents(new ActionRowBuilder().addComponents(
                    new TextInputBuilder().setCustomId("search_input").setLabel("คีย์ที่ต้องการค้นหา").setStyle(TextInputStyle.Short).setRequired(true)
                )));
        }

        if (interaction.customId === "dash_hwidcooldown") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.reply({ content: "❌ คุณไม่มีสิทธิ์", flags: MessageFlags.Ephemeral });
            return interaction.showModal(new ModalBuilder().setCustomId("hwid_cooldown_modal").setTitle("Set HWID Cooldown")
                .addComponents(new ActionRowBuilder().addComponents(
                    new TextInputBuilder().setCustomId("cooldown_input").setLabel("จำนวนชั่วโมง").setStyle(TextInputStyle.Short).setPlaceholder("เช่น 24").setRequired(true)
                )));
        }

        if (interaction.customId === "dash_loader") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const guildScripts = getGuildScripts(interaction.guildId);
            const scriptList = Object.keys(guildScripts);
            if (scriptList.length === 0) return interaction.editReply({ content: "❌ ยังไม่มีสคริปต์" });
            const loaderLines = scriptList.map(n => `loadstring(game:HttpGet('${guildScripts[n]}'))()`).join("\n");
            return interaction.editReply({ content: `**Loader:**\n\`\`\`lua\n${loaderLines}\n\`\`\`` });
        }

        if (interaction.customId === "dash_accessrole") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.reply({ content: "❌ คุณไม่มีสิทธิ์", flags: MessageFlags.Ephemeral });
            return interaction.showModal(new ModalBuilder().setCustomId("access_role_modal").setTitle("Set Access Role")
                .addComponents(new ActionRowBuilder().addComponents(
                    new TextInputBuilder().setCustomId("role_input").setLabel("Role ID").setStyle(TextInputStyle.Short).setRequired(true)
                )));
        }

        if (interaction.customId === "dash_renewtime") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            return interaction.editReply({ content: "ใช้คำสั่ง `/generate_key` เพื่อสร้างคีย์ใหม่ให้ผู้ใช้ครับ" });
        }

        if (interaction.customId === "dash_unusedkeys") {
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const result = await serverGet("/keys");
            const unused = Object.entries(result.keys || {}).filter(([, v]) => !v.usedBy || v.usedBy === "").map(([k]) => k);
            if (unused.length === 0) return interaction.editReply({ content: "📭 ไม่มีคีย์ที่ยังไม่ได้ใช้" });
            const chunks = [];
            for (let i = 0; i < unused.length; i += 10) chunks.push(unused.slice(i, i + 10));
            const embed = new EmbedBuilder().setTitle("🗝️ Unused Keys").setColor(0x2ecc71);
            chunks.forEach((chunk, idx) => embed.addFields({ name: idx === 0 ? `จำนวน ${unused.length} คีย์` : "​", value: chunk.map(k => "`" + k + "`").join("\n") }));
            return interaction.editReply({ embeds: [embed] });
        }

        if (interaction.customId === "get_script") {
            const guildScripts = getGuildScripts(interaction.guildId);
            if (Object.keys(guildScripts).length === 0) return interaction.editReply({ content: "❌ ยังไม่มีสคริปต์" });
            // fetch key ของ user ใน guild นี้ (server fallback หลายชั้น)
            const _cacheKey = interaction.user.id + ":" + interaction.guildId;
            let cached = getCachedKey(_cacheKey);
            if (!cached) {
                const r = await serverGet(`/keys/user/${interaction.user.id}?guildId=${interaction.guildId}`);
                if (!r.ok) return interaction.editReply({ content: "❌ กรุณา Redeem Key ก่อน" });
                setCachedKey(_cacheKey, r.key, r.data);
                cached = getCachedKey(_cacheKey);
            }
            if (!cached) return interaction.editReply({ content: "❌ กรุณา Redeem Key ก่อน" });
            if (cached.data.expired) return interaction.editReply({ content: "❌ คีย์หมดอายุแล้ว" });
            // กรอง script ตาม file ที่ key ผูกไว้
            const keyFile = cached.data.file || null;
            const allScriptNames = Object.keys(guildScripts);
            const scriptNames = keyFile
                ? allScriptNames.filter(n => n === keyFile)
                : allScriptNames;
            if (scriptNames.length === 0) return interaction.editReply({ content: `❌ ไม่มีสคริปต์ที่ใช้ได้${keyFile ? ` (คีย์นี้ผูกกับไฟล์ \`${keyFile}\`)` : ""}` });
            if (scriptNames.length === 1) {
                const script = `getgenv().key = "${cached.key}"\nloadstring(game:HttpGet('${guildScripts[scriptNames[0]]}'))()`;
                return interaction.editReply({ content: `**🎮 ${scriptNames[0]}**${keyFile ? ` *(key สำหรับไฟล์นี้)*` : ""}\n\`\`\`lua\n${script}\n\`\`\`\n${script}\n-# 📱 MOBILE: กดค้างที่ข้อความด้านบนเพื่อ Copy | 🍎 IPHONE: ข้อความด้านบนคือ Script` });
            }
            const rows = [];
            let row = new ActionRowBuilder();
            scriptNames.forEach((name, idx) => {
                if (idx > 0 && idx % 5 === 0) { rows.push(row); row = new ActionRowBuilder(); }
                row.addComponents(new ButtonBuilder().setCustomId(`script_btn_${name}`).setLabel(name).setStyle(ButtonStyle.Secondary));
            });
            rows.push(row);
            if (rows.length > 5) rows.length = 5;
            return interaction.editReply({ content: "🎮 เลือกสคริปต์:", components: rows });
        }

        if (interaction.customId.startsWith("script_btn_")) {
            const scriptName = interaction.customId.slice("script_btn_".length);
            const url = getGuildScripts(interaction.guildId)[scriptName];
            if (!url) return interaction.editReply({ content: "❌ ไม่พบสคริปต์" });
            const _cacheKey2 = interaction.user.id + ":" + interaction.guildId;
            let cached = getCachedKey(_cacheKey2);
            if (!cached) {
                const r = await serverGet(`/keys/user/${interaction.user.id}?guildId=${interaction.guildId}`);
                if (!r.ok) return interaction.editReply({ content: "❌ กรุณา Redeem Key ก่อน" });
                setCachedKey(_cacheKey2, r.key, r.data);
                cached = getCachedKey(_cacheKey2);
            }
            if (!cached) return interaction.editReply({ content: "❌ กรุณา Redeem Key ก่อน" });
            const keyFile = cached.data.file || null;
            if (keyFile && keyFile !== scriptName) return interaction.editReply({ content: `❌ คีย์นี้ใช้ได้แค่ไฟล์ \`${keyFile}\` เท่านั้น` });
            const script = `getgenv().key = "${cached.key}"\nloadstring(game:HttpGet('${url}'))()`;
            return interaction.editReply({ content: `**🎮 ${scriptName}**\n\`\`\`lua\n${script}\n\`\`\`\n${script}\n-# 📱 MOBILE: กดค้างที่ข้อความด้านบนเพื่อ Copy | 🍎 IPHONE: ข้อความด้านบนคือ Script` });
        }

        if (interaction.customId === "redeem_key") {
            return interaction.showModal(new ModalBuilder().setCustomId("redeem_modal").setTitle("Redeem Key")
                .addComponents(new ActionRowBuilder().addComponents(
                    new TextInputBuilder().setCustomId("key_input").setLabel("คีย์ของคุณ").setStyle(TextInputStyle.Short).setMinLength(32).setMaxLength(32).setRequired(true)
                )));
        }

        if (interaction.customId === "reset_hwid") {
            const _gCfg = getGuildConfig(interaction.guildId);
            const hwidResetCooldownHours = _gCfg.hwidResetCooldownHours;
            if (hwidResetCooldownHours === null) return interaction.editReply({ content: "❌ แอดมินยังไม่ตั้งค่า Cooldown" });
            let cached = getCachedKey(interaction.user.id + ":" + (interaction.guildId || ""));
            if (!cached) {
                const result = await serverGet(`/keys/user/${interaction.user.id}?guildId=${interaction.guildId}`);
                if (!result.ok) return interaction.editReply({ content: "❌ ยังไม่ได้ Redeem Key" });
                setCachedKey(interaction.user.id + ":" + interaction.guildId, result.key, result.data);
                cached = getCachedKey(interaction.user.id + ":" + interaction.guildId);
            }
            if (cached.data.expired) return interaction.editReply({ content: "❌ คีย์หมดอายุแล้ว" });
            const nowSec = Math.floor(Date.now() / 1000);
            const lastReset = cached.data.lastHwidReset || 0;
            const cooldownSec = hwidResetCooldownHours * 3600;
            if (lastReset > 0 && (nowSec - lastReset) < cooldownSec) {
                const remaining = cooldownSec - (nowSec - lastReset);
                return interaction.editReply({ content: `⏳ รีเซ็ตได้อีกใน **${Math.floor(remaining/3600)} ชม. ${Math.floor((remaining%3600)/60)} นาที**` });
            }
            await serverPost(`/keys/${cached.key}/reset-hwid`, {});
            clearCachedKey(interaction.user.id + ":" + (interaction.guildId || ""));
            return interaction.editReply({ content: "✅ รีเซ็ต HWID สำเร็จ!" });
        }

        if (interaction.customId === "key_state") {
            const _stCacheKey = interaction.user.id + ":" + interaction.guildId;
            let cached = getCachedKey(_stCacheKey);
            if (!cached) {
                const result = await serverGet(`/keys/user/${interaction.user.id}?guildId=${interaction.guildId}`);
                if (!result.ok) return interaction.editReply({ content: "❌ ยังไม่ได้ Redeem Key" });
                setCachedKey(_stCacheKey, result.key, result.data);
                cached = getCachedKey(_stCacheKey);
            }
            const d = cached.data;
            // เช็คว่า key นี้ถูก redeem ใน guild นี้ไหม
            if (d.guildId && d.guildId !== interaction.guildId) return interaction.editReply({ content: "❌ คีย์นี้ถูกใช้ใน Server อื่น" });
            return interaction.editReply({ embeds: [new EmbedBuilder().setTitle("📊 Key State").setColor(0x3498db).addFields(
                { name: "🗝️ Key", value: `\`${cached.key}\``, inline: false },
                { name: "✅ Active", value: String(d.active), inline: true },
                { name: "❌ Expired", value: String(d.expired), inline: true },
                { name: "⏰ Time Left", value: timeText(d.redeemedAt, d.duration), inline: true },
                { name: "▶️ Executions", value: String(d.executionCount || 0), inline: true },
                { name: "🖥️ HWID", value: d.hwid || "ยังไม่มี", inline: false },
                { name: "🏠 Guild", value: d.guildId || "ไม่ระบุ", inline: false }
            )] });
        }
    }

    if (interaction.isModalSubmit()) {
        const licResult = await checkGuildLicenseCached(interaction.guildId);
        if (!licResult.ok) {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            return interaction.editReply({ content: "❌ Server นี้ไม่มี License หรือ License หมดอายุแล้ว" });
        }

        if (interaction.customId === "search_key_modal") {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const keyName = interaction.fields.getTextInputValue("search_input").trim();
            const result = await serverGet(`/keys/${keyName}`);
            if (!result.ok) return interaction.editReply({ content: `❌ ไม่พบคีย์` });
            const d = result.data;
            return interaction.editReply({ embeds: [new EmbedBuilder().setTitle("🔍 Key Info").setColor(0xe67e22).addFields(
                { name: "🗝️ Key", value: `\`${keyName}\``, inline: false },
                { name: "✅ Active", value: String(d.active), inline: true },
                { name: "❌ Expired", value: String(d.expired), inline: true },
                { name: "⏰ Time Left", value: timeText(d.redeemedAt, d.duration), inline: true },
                { name: "▶️ Executions", value: String(d.executionCount || 0), inline: true },
                { name: "👤 Used By", value: d.usedBy ? `<@${d.usedBy}>` : "ยังไม่มี", inline: true },
                { name: "🖥️ HWID", value: d.hwid || "ยังไม่มี", inline: false }
            )] });
        }

        if (interaction.customId === "hwid_cooldown_modal") {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const hours = parseInt(interaction.fields.getTextInputValue("cooldown_input").trim());
            if (isNaN(hours)) return interaction.editReply({ content: "❌ กรุณาใส่ตัวเลข" });
            const cfg = getGuildConfig(interaction.guildId);
            cfg.hwidResetCooldownHours = hours;
            await serverPost("/config", { guildConfigs });
            return interaction.editReply({ content: `✅ ตั้ง HWID Cooldown = **${hours} ชั่วโมง**` });
        }

        if (interaction.customId === "access_role_modal") {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            if (!isAdmin(interaction.member, interaction.guildId)) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
            const roleId = interaction.fields.getTextInputValue("role_input").trim();
            const cfg = getGuildConfig(interaction.guildId);
            cfg.adminRoleId = roleId;
            await serverPost("/config", { guildConfigs });
            return interaction.editReply({ content: `✅ ตั้ง Access Role = <@&${roleId}>` });
        }

        if (interaction.customId === "redeem_modal") {
            await interaction.deferReply({ flags: MessageFlags.Ephemeral });
            const keyName = interaction.fields.getTextInputValue("key_input").trim();
            const result = await serverPost(`/keys/${keyName}/redeem`, { userId: interaction.user.id, guildId: interaction.guildId });
            if (!result.ok) {
                const msgs = { "Key ไม่ถูกต้อง": "❌ คีย์ไม่ถูกต้อง", "Key หมดอายุแล้ว": "❌ คีย์หมดอายุแล้ว", "Key used by someone else": "❌ คีย์ถูกใช้โดยคนอื่น", "Already redeemed": "⚠️ คุณใช้คีย์นี้อยู่แล้ว", "Key used in another guild": "❌ คีย์นี้ถูกใช้ใน Server อื่นแล้ว" };
                return interaction.editReply({ content: msgs[result.reason] || "❌ เกิดข้อผิดพลาด" });
            }
            clearCachedKey(interaction.user.id + ":" + interaction.guildId);
            return interaction.editReply({ content: `✅ Redeem สำเร็จ!\n**Duration:** ${result.duration === -1 ? "♾️ ถาวร" : `${Math.floor(result.duration/86400)} วัน`}` });
        }
    }
  } catch (err) {
    console.error("[interactionCreate error]", err);
    try {
      const errMsg = { content: "❌ เกิดข้อผิดพลาด กรุณาลองใหม่" };
      if (interaction.deferred || interaction.replied) await interaction.editReply(errMsg);
      else await interaction.reply({ ...errMsg, flags: MessageFlags.Ephemeral });
    } catch {}
  }
});

// ====== LICENSE COMMAND HANDLERS (owner-only, ไม่ต้องเช็ค license) ======
client.on("interactionCreate", async (licInteraction) => {
  try {
    if (!licInteraction.isChatInputCommand()) return;
    const cmd = licInteraction.commandName;

    if (cmd === "addlicense") {
        await licInteraction.deferReply({ flags: MessageFlags.Ephemeral });
        if (licInteraction.user.id !== OWNER_ID) return licInteraction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
        const guildId = licInteraction.options.getString("guild_id");
        const days = licInteraction.options.getInteger("days");
        const note = licInteraction.options.getString("note") || "";
        const result = await ownerPost("/guild/license", { guildId, days, note });
        if (!result.ok) return licInteraction.editReply({ content: "❌ เกิดข้อผิดพลาด" });
        return licInteraction.editReply({ embeds: [new EmbedBuilder().setTitle("✅ License Added").setColor(0x00ff88)
            .addFields(
                { name: "🏠 Guild ID", value: guildId, inline: false },
                { name: "⏰ Duration", value: days === 0 ? "♾️ ถาวร" : `${days} วัน`, inline: true },
                { name: "📝 Note", value: note || "-", inline: true }
            )] });
    }

    if (cmd === "renewlicense") {
        await licInteraction.deferReply({ flags: MessageFlags.Ephemeral });
        if (licInteraction.user.id !== OWNER_ID) return licInteraction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
        const guildId = licInteraction.options.getString("guild_id");
        const days = licInteraction.options.getInteger("days");
        const result = await ownerPost("/guild/renew", { guildId, days });
        if (!result.ok) return licInteraction.editReply({ content: "❌ ไม่พบ Guild หรือเกิดข้อผิดพลาด" });
        return licInteraction.editReply({ content: `✅ ต่ออายุแล้ว **${days} วัน**\nหมดอายุ: ${licenseTimeText(result.expiresAt)}` });
    }

    if (cmd === "deletelicense") {
        await licInteraction.deferReply({ flags: MessageFlags.Ephemeral });
        if (licInteraction.user.id !== OWNER_ID) return licInteraction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });
        const guildId = licInteraction.options.getString("guild_id");
        const result = await ownerDelete(`/guild/license/${guildId}`);
        return licInteraction.editReply({ content: result.ok ? "🗑️ ลบ License แล้ว" : "❌ ไม่พบ Guild" });
    }

    if (cmd === "licenseinfo") {
        await licInteraction.deferReply({ flags: MessageFlags.Ephemeral });
        const result = await checkGuildLicense(licInteraction.guildId);
        const color = result.ok ? 0x00ff88 : 0xff4444;
        return licInteraction.editReply({ embeds: [new EmbedBuilder().setTitle("📋 License Info").setColor(color)
            .addFields(
                { name: "✅ Status", value: result.ok ? "Active" : "❌ Expired/ไม่มี License", inline: true },
                { name: "⏰ Time Left", value: result.expiresAt ? licenseTimeText(result.expiresAt) : "ไม่มี", inline: true },
                { name: "📝 Note", value: result.note || "-", inline: false }
            )] });
    }
  } catch (err) {
    console.error("[licenseInteraction error]", err);
    try {
      const errMsg = { content: "❌ เกิดข้อผิดพลาด กรุณาลองใหม่" };
      if (licInteraction.deferred || licInteraction.replied) await licInteraction.editReply(errMsg);
      else await licInteraction.reply({ ...errMsg, flags: MessageFlags.Ephemeral });
    } catch {}
  }
});

client.login(TOKEN);
