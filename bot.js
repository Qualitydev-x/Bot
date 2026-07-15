const {
    Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder,
    EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,
    ModalBuilder, TextInputBuilder, TextInputStyle, MessageFlags
} = require('discord.js');
const crypto = require('crypto');

const TOKEN = process.env.BOT_TOKEN || "ใส่ TOKEN";
const CLIENT_ID = process.env.CLIENT_ID || "ใส่ CLIENT_ID";
const OWNER_ID = process.env.OWNER_ID || "1395634489404686379";
const SERVER_URL = process.env.SERVER_URL || "https://server-production-d776.up.railway.app";
const BOT_SECRET = process.env.BOT_SECRET || "rainx-bot-secret";
const MOONVEIL_KEY = process.env.MOONVEIL_KEY || "mv-secret-2502adb8-d1ec-40fd-9d76-e2a424bbb253";
const PASTEFY_KEY = process.env.PASTEFY_KEY || "ccZFKS97zNu94petuhZaq9uWUq6rtypxMejTX0NyZRTNYZ0tRdbnwCevXquE";

const CLIENT_LOADER = `-- Obfuscation Type: Me (Luauth) - Custom VM/Encoding
local deviceId = "?"
local startTime = false
do
	local setupComplete = startTime
	pcall(function()
		setupComplete = true
		local tutorialKey = "nil  nil  "
		local charset = "qwertyuiopasdfghjklzxcvbnm098765"
		local userGameSettings = UserSettings():GetService("UserGameSettings")
		if not userGameSettings:GetTutorialState(tutorialKey) then
			deviceId = ""
			local seed = (wait())[1] * 1000000
			local rng = (function(initial)
				local a = 1103515245
				local c = 12345
				local m = 99999999
				local state = initial % 2147483648
				local idx = 1
				return function(min, max)
					local mVal = m
					local newState = a * state + c
					local randVal = newState % mVal + idx
					idx = idx + 1
					state = randVal
					c = newState % 4858 * (mVal % 5782)
					return min + randVal % max - min + 1
				end
			end)(seed - seed % 1)
			userGameSettings:SetTutorialState(tutorialKey, true)
			local bitIndex = 0
			for _ = 1, 16 do
				local bits = 0
				local multiplier = 1
				for _ = 1, 5 do
					local bitValue = rng(10, 20) > 15
					userGameSettings:SetTutorialState(tutorialKey .. bitIndex, bitValue)
					bits = bits + (bitValue and 1 or 0) * multiplier
					multiplier = multiplier * 2
					bitIndex = bitIndex + 1
				end
				deviceId = deviceId .. charset:sub(bits + 1, bits + 1)
			end
		else
			local bitIndex = 0
			deviceId = ""
			for _ = 1, 16 do
				local bits = 0
				local multiplier = 1
				for _ = 1, 5 do
					bits = bits + (userGameSettings:GetTutorialState(tutorialKey .. bitIndex) and 1 or 0) * multiplier
					multiplier = multiplier * 2
					bitIndex = bitIndex + 1
				end
				deviceId = deviceId .. charset:sub(bits + 1, bits + 1)
			end
		end
	end)
	while not setupComplete do
	end
end
startTime = os.clock()
if devsignature_sig then
	print("        Pighub Loader - Lua whitelist service\\n        This is a signature - If you are seeing this, you know what not to do :3\\n        Have a good day!\\n        https://pighub.net/ - Lua wl service\\n    ")
end
local authFunction1
local authFunction2
local authFunction3
local authValue3
local authValue2
local authValue1
local authFlag1
local authFlag2
local authString1
local authString2
local cooldownTime
local hugeNumber = math.huge
local errorMessage = "Not specified"
local decodeFunc
local decodeTable
local mathFloor = math.floor
local mathRandom = math.random
local tableRemove = table.remove
local charFunc = string.char
local seed1 = 0
local seed2 = 2
local byteToChar = {}
local charToNibble = {}
local shuffleTable = {}
for i = 1, 256 do
	shuffleTable[i] = i
end
repeat
	local randIndex = tableRemove(shuffleTable, (mathRandom(1, # shuffleTable)))
	charToNibble[randIndex] = charFunc(randIndex - 1)
until # shuffleTable == 0
local lcgState = {}
do
	local localMathFloor, localSeed1, localSeed2, localCharToNibble, localLcgState = mathFloor, seed1, seed2, charToNibble, lcgState
	local function generateBytes()
		if # localLcgState == 0 then
			localSeed1 = (localSeed1 * 169 + 7579774851987) % 35184372088832
			repeat
				localSeed2 = localSeed2 * 27 % 257
			until localSeed2 ~= 1
			local shift = localSeed2 % 32
			local temp = localMathFloor(localSeed1 / 2 ^ (13 - (localSeed2 - shift) / 32)) % 4294967296 / 2 ^ shift
			local high = localMathFloor(temp % 1 * 4294967296) + localMathFloor(temp)
			local low = high % 65536
			local mid = (high - low) / 65536
			local b1 = low % 256
			local b2 = (low - b1) / 256
			local b3 = mid % 256
			local b4 = (mid - b3) / 256
			localLcgState = {
				b1,
				b2,
				b3,
				b4
			}
		end
		return table.remove(localLcgState)
	end
	local decodeCache = {}
	decodeTable = decodeCache
	decodeFunc = function(data, key)
		local cache = decodeCache
		if not cache[key] then
			lcgState = {}
			local charTable = localCharToNibble
			localSeed1 = key % 35184372088832
			localSeed2 = key % 255 + 2
			local len = # data
			cache[key] = ""
			local accumulator = 180
			for i = 1, len do
				accumulator = (string.byte(data, i) + generateBytes() + accumulator) % 256
				cache[key] = cache[key] .. charTable[accumulator + 1]
			end
		end
		return key
	end
end
mathFloor = PIGHUB_SkipAntidebugDevMode
mathRandom = PIGHUB_AllowKeyCheckSkip
tableRemove = ff97f23b97f93792992999 and ff97f23b97f93792992999() == "j" or false
charFunc = "eu1-roblox-auth.pighub.net"
seed1 = l_fastload_enabled
seed2 = os.time(os.date("*t")) - os.time(os.date("!*t"))
if seed2 < 0 then
	seed2 = (86400 + - (- seed2 % 86400)) % 86400
else
	seed2 = seed2 % 86400
end
local hour = seed2 / 3600
if hour >= 21 or hour < 5 then
	charFunc = ({
		"eu1-roblox-auth.pighub.net",
		"eu2-roblox-auth.pighub.net"
	})[math.random(1, 2)]
elseif hour >= 5 and hour < 15 then
	charFunc = ({
		"as1-roblox-auth.pighub.net",
		"as2-roblox-auth.pighub.net",
		"as3-roblox-auth.pighub.net",
		"au1-roblox-auth.pighub.net",
		"au2-roblox-auth.pighub.net"
	})[math.random(1, 5)]
elseif hour >= 15 and hour < 21 then
	charFunc = ({
		"us1-roblox-auth.pighub.net",
		"us2-roblox-auth.pighub.net"
	})[math.random(1, 2)]
else
	game:GetService("Players").LocalPlayer:Kick("invalid timezone - send this screenshot to developer and Federal")
end
pcall(function()
	if game:GetService("LocalizationService"):GetCountryRegionForPlayerAsync(game:GetService("Players").LocalPlayer) == "AU" then
		charFunc = ({
			"au1-roblox-auth.pighub.net",
			"au2-roblox-auth.pighub.net"
		})[math.random(1, 2)]
	end
end)
local config = {
	Version = "3.4",
	Host = tableRemove and LT_R_RRT_H or "https://" .. charFunc,
	ScriptID = "2674ffd1c9054918b647386bab0ae9fc",
	ScriptVersion = "0001",
	Name = "TEST"
}
local isNotTable = type(({
	...
})[1]) ~= "table"
local wsInstance = false
local heartbeatFailedFlag = false
local customHashResult = nil
local shuffleResult = nil
local lcgResult = nil
local authState
local scriptVersionPath
local scriptKey = script_key or "none"
local frameCount = 0
local wsClosing = false
local debugOutput = false
local errorCode = 68
local printFunc = print
local nextFunc = next
local charFunc2 = string.char
local executorIdentified = true
local identifyExecutor = identifyexecutor
local gameService = game
local pcallFunc = pcall
local httpGetEnabled = true
local gmatchFunc = string.gmatch
local tracebackFunc = debug.traceback
local tonumberFunc = tonumber
local setmetatableFunc = setmetatable
local rawgetFunc = rawget
local waitFunc = wait
local getInfoFunc = debug.getinfo
local loadstringFunc = loadstring
local timeFunc = os.time
local byteFunc = string.byte
local subFunc = string.sub
local spawnFunc = spawn
local heartbeat = game:GetService("RunService").Heartbeat
local clockFunc = os.clock
local rconsolePrint = rconsoleprint
local hugeNum = math.huge
local tostringFunc = tostring
local pairsFunc = pairs
local findFunc = string.find
local function showErrorAndKick(title, message)
	loadstringFunc("local t,r = ...\\nspawn(function() while wait() do pcall(function() game:GetService(\\"CoreGui\\").RobloxPromptGui.promptOverlay.ErrorPrompt.TitleFrame.ErrorTitle.Text = t\\ngame:GetService(\\"CoreGui\\").RobloxPromptGui.promptOverlay.ErrorPrompt.MessageArea.ErrorFrame.ErrorMessage.Text = r end) end end)\\ngame:GetService('Players').LocalPlayer:Kick(r)\\n        ")(title, message)
	while waitFunc() do
	end
end
local WebSocketHandler = {}
local wsReady = false
local formatFunc = string.format
local subFunc2 = string.sub
local concatFunc = table.concat
local typeFunc = type
local pairsFunc2 = pairsFunc
local waitFunc2 = waitFunc
local coroutineWrap = coroutine.wrap
local wsConnect = syn and syn.websocket and syn.websocket.connect or WebSocket and WebSocket.connect or WebsocketClient and function(url)
	local client = WebsocketClient.new(url)
	client:Connect()
	return client
end
do
	local localFormat, localSub, localConcat, localType, localPairs, localWait, localWrap, localConnect = formatFunc, subFunc2, concatFunc, typeFunc, pairsFunc2, waitFunc2, coroutineWrap, wsConnect
	local function serializeTable(tbl)
		local parts = {}
		for k, v in localPairs(tbl) do
			parts[# parts + 1] = localFormat("\\"%s\\":%s,", k, localType(v) == "table" and serializeTable(v) or "\\"" .. v .. "\\"")
		end
		return "{" .. localSub(localConcat(parts), 0, - 2) .. "}"
	end
	local function startHeartbeat(ws)
		local function onMessage(msg)
			if msg == "PONG" then
				if debugOutput then
					rconsolePrint("[" .. clockFunc() .. "] [PONG] Server ---> Client \\n")
				end
				ws.LastPong = tick()
				return
			else
				local idMatch = string.match(msg, "|__(%d+)__|")
				if debugOutput then
					rconsolePrint("[" .. clockFunc() .. "] [RESPONSE] Server ---> Client: " .. msg .. "\\n")
				end
				if idMatch then
					local reqId = idMatch + 0
					local event = ws.Requests[reqId]
					assert(event, "Internal Error: no event receiver")
					event:Fire(msg:gsub("|__(%d+)__|", ""))
					return event:Destroy()
				else
					return ws.OnMessageSignal:Fire(msg)
				end
			end
		end
		local function onClose()
			if debugOutput then
				rconsolePrint("[" .. clockFunc() .. "] [CLOSED] ")
			end
			ws.__OBJECT_ACTIVE = false
			if ws.SocketClosed or wsClosing then
				if debugOutput then
					rconsolePrint(" (ALREADY CLOSED)\\n")
				end
				return
			else
				local attempts = 0
				local newWs
				while true do
					if debugOutput then
						rconsolePrint("[" .. clockFunc() .. "] Attempting to reconnect to wshttpemu\\n")
					end
					local startReconnect = timeFunc()
					local finished = false
					local success
					spawnFunc(function()
						local ok, result = pcallFunc(localConnect, ws.Url)
						newWs = result
						success = ok
						finished = true
					end)
					while not finished and timeFunc() < startReconnect + 8 do
						localWait()
					end
					if debugOutput then
						rconsolePrint("[" .. clockFunc() .. "] ######## L_PASS: d: " .. tostringFunc(finished) .. ", ok: " .. tostringFunc(success) .. "\\n")
					end
					if not finished then
						wsInstance = false
						attempts = 10
						warn("[2] Unable to connect (timeout)")
					end
					if not success then
						attempts = attempts + 1
						if attempts > 5 then
							wsInstance = false
						end
						localWait(attempts < 4 and 10 or 120)
					else
						break
					end
				end
				attempts = 0
				if debugOutput then
					rconsolePrint("[" .. clockFunc() .. "] [CONNECT] Reconnected\\n")
				end
				ws.__OBJECT_ACTIVE = true
				ws.Websocket = newWs
				wsInstance = ws
				newWs:Send(serializeTable({
					Opcode = "PING",
					Data = {}
				}))
				pcallFunc(function()
					newWs.OnClose:Connect(onClose)
					newWs.OnMessage:Connect(onMessage)
				end)
				pcallFunc(function()
					newWs.ConnectionClosed:Connect(onClose)
					newWs.DataReceived:Connect(onMessage)
				end)
				return
			end
		end
		pcallFunc(function()
			ws.Websocket.OnClose:Connect(onClose)
			ws.Websocket.OnMessage:Connect(onMessage)
		end)
		pcallFunc(function()
			ws.Websocket.DataReceived:Connect(onMessage)
			ws.Websocket.ConnectionClosed:Connect(onClose)
		end)
		ws.LastPong = tick()
		while localWait(10) do
			if debugOutput then
				rconsolePrint("[" .. clockFunc() .. "] [PING] Client ---> Server\\n")
			end
			if ws.__OBJECT_ACTIVE then
				ws.Websocket:Send(serializeTable({
					Opcode = "PING",
					Data = {}
				}))
				if tick() - ws.LastPong > 20 then
					if debugOutput then
						rconsolePrint("[" .. clockFunc() .. "] [WARN] Server timeout\\n")
					end
					warn("Server timeout")
					ws.Websocket:Close()
				end
			end
		end
	end
	WebSocketHandler.new = function(self, url)
		local obj = {}
		setmetatableFunc(obj, self)
		self.__index = self
		local startTime = timeFunc()
		local connected = false
		local wsObj
		local err
		spawnFunc(function()
			local ok, result = pcallFunc(localConnect, url)
			wsObj = result
			connected = ok
			err = result
		end)
		while not connected and timeFunc() < startTime + 8 do
			localWait()
		end
		if not connected then
			wsInstance = false
			error("Unable to connect to WS")
		end
		assert(connected, err)
		self.Websocket = wsObj
		self.Url = url
		self.OnMessageSignal = Instance.new("BindableEvent")
		self.OnMessage = self.OnMessageSignal.Event
		self.Requests = {}
		self.__OBJECT_ACTIVE = true
		localWrap(startHeartbeat)(self)
		repeat
			heartbeat:Wait()
		until self.LastPong
		return obj
	end
	WebSocketHandler.request = function(self, data)
		if debugOutput then
			rconsolePrint("[" .. clockFunc() .. "] [REQUEST] Client ---> Server, ObjectActive: " .. tostringFunc(self.__OBJECT_ACTIVE) .. "\\n")
		end
		local attempts = 0
		while true do
			if true then
				attempts = attempts + 1
				localWait(0.1)
				if attempts > 40 then
					warn("[3] r_timeout")
					wsInstance = false
					return ""
				end
			else
				if debugOutput then
					rconsolePrint("[" .. clockFunc() .. "] [REQUEST] [!!!] OBJECT ACTIVE PASSED\\n")
				end
				local reqId = math.random(1, 99999999)
				local event = Instance.new("BindableEvent")
				if debugOutput then
					rconsolePrint("[" .. clockFunc() .. "] Event assigned\\n")
				end
				self.Requests[reqId] = event
				self.Websocket:Send(serializeTable({
					Opcode = "REQUEST",
					Data = data,
					Id = reqId
				}))
				if debugOutput then
					rconsolePrint("[" .. clockFunc() .. "] Packet sent!\\n")
				end
				local responded = false
				spawnFunc(function()
					localWait(30)
					if not responded then
						if debugOutput then
							rconsolePrint("[" .. clockFunc() .. "] !!!!!! ALERT !!!!!!!!! REQ TIMEOUT !!!!!!!!\\n")
						end
						local ev = self.Requests[reqId]
						assert(ev, "Internal Error: no event receiver")
						ev:Fire("")
						if debugOutput then
							rconsolePrint("[" .. clockFunc() .. "] Responded with something empty\\n")
						end
						return ev:Destroy()
					else
						return
					end
				end)
				local result = event.Event:Wait()
				responded = true
				return result
			end
		end
	end
	WebSocketHandler.close = function(self)
		self.SocketClosed = true
		self.Websocket:Close()
	end
end
local scriptKeyValue = script_key or "none"
local heartbeatCounter = 0
local heartbeatActive = false
do
	local localHeartbeatActive = heartbeatActive
	spawnFunc(function()
		localHeartbeatActive = true
		while not wsReady do
			heartbeatCounter = heartbeatCounter + 1
			heartbeat:Wait()
		end
	end)
	while not localHeartbeatActive do
		heartbeat:Wait()
	end
	local function waitForHeartbeatChange()
		local current = heartbeatCounter
		while heartbeatCounter == current do
			heartbeat:Wait()
		end
	end
	waitForHeartbeatChange = waitForHeartbeatChange
end
local function crashScript(enableCrash)
	if enableCrash then
		for _ = 1, 99999999 do
			for _ = 1, 99999999 do
				LPH_CRASH()
			end
		end
	end
	while waitFunc() do
	end
end
local executorType = 1
local httpRequest = syn and syn.request or request or http_request
if identifyExecutor and ({
	identifyExecutor()
})[1] == "Synapse X" and not gethui and syn then
	executorType = 1
elseif identifyExecutor and ({
	identifyExecutor()
})[1] == "ScriptWare" then
	executorType = ({
		identifyExecutor()
	})[2] == "Mac" and 5 or 2
elseif FLUXUS_LOADED or EVON_LOADED or WRD_LOADED or COMET_LOADED or OZONE_LOADED or TRIGON_LOADED then
	executorType = 4
elseif KRNL_LOADED then
	executorType = 3
elseif Electron_Loaded then
	executorType = 6
elseif identifyExecutor and ({
	identifyExecutor()
})[1] == "Sirhurt" then
	executorType = 7
end
;
(function(maxVal, alphabet)
	local encodeMap = {}
	local decodeMap = {}
	for i = 0, 255 do
		local ch = charFunc2(i)
		decodeMap[i] = ch
		decodeMap[ch] = i
	end
	local alph = alphabet
	for idx = 1, # alph do
		local ch = alph[idx]
		encodeMap[idx - 1] = ch
		encodeMap[ch] = idx - 1
	end
end)(255, {
	"a",
	"b",
	"Q",
	"k",
	"O",
	"I",
	"1",
	"l",
	"0",
	"9",
	"E",
	"3",
	"J",
	"7",
	"G",
	"T"
})
local function mathFloorFunc(x)
	return x - x % 1
end
local function lcgFactory(seed)
	local a = 1103515245
	local c = 12345
	local m = 99999999
	local state = seed % 2147483648
	local idx = 1
	return function(min, max)
		local mVal = m
		local newState = a * state + c
		local randVal = newState % mVal + idx
		idx = idx + 1
		state = randVal
		c = newState % 4859 * (mVal % 5781)
		return min + randVal % max - min + 1
	end
end
local function customHash(value)
	for _ = 1, 2 do
		local v1 = value % 9915 + 4
		local v2
		local v3
		for i = 1, 3 do
			v2 = value % 4155 + 3
			if i % 2 == 1 then
				v2 = v2 + 522
			end
			v3 = value % 9996 + 1
			if v3 % 2 ~= 1 then
				v3 = v3 * 3
			end
		end
		local v4 = value % 9999995 + 1 + 13729
		local v5 = value % 1000
		local v6 = mathFloorFunc((value - v5) / 1000) % 1000
		local v7 = v5 * v6 + v4 + value % (419824125 - v4 + v5)
		local v8 = value % (v1 * v2 + 9999) + 13729
		value = (v7 + (v8 + (v5 * v2 + v6)) % 999999 * (v4 + v8 % v3)) % 99999999999
	end
	return value
end
local function logMessage(msg)
	printFunc("[" .. config.Name .. "]: " .. msg)
end
local function validateState(stateTable)
	local map1 = {}
	local map2 = {}
	local map3 = {}
	for i = 1, 13 do
		local key = {}
		local val = {}
		map1[key] = val
		map2[val] = i
		map3[key] = val
	end
	local sum1 = 0
	local sum2 = 0
	local count = 0
	if stateTable then
		map1 = stateTable[1]
		map2 = stateTable[2]
		map3 = stateTable[3]
	end
	for k, v in nextFunc, map1 do
		local mapped = map2[v]
		if map3[k] == v then
			sum1 = sum1 + 1
		end
		count = count + 1
		sum2 = count % 2 == 0 and sum2 * mapped or sum2 + mapped + count
	end
	if sum1 ~= 13 then
		authState = - 1
	end
	local authTableStore = {
		map1,
		map2,
		map3
	}
	authState = sum2
	return false
end
errorCode = 68
logMessage("[1/3] Loading Pighub Loader...")
local lcg1 = nil
authState = - 1
validateState()
while authState == - 1 do
end
lcg1 = lcgFactory(heartbeatCounter + authState)
if executorType == 1 or executorType == 2 then
	local counter1 = 0
	local counter2 = 0
	pcallFunc(function()
		(function(tbl)
			tostringFunc(tbl[1])
		end)(setmetatableFunc({}, {
			__index = function(_, _)
				local recursive
				recursive = function()
					counter1 = counter1 + 1
					return recursive()
				end
				recursive()
			end
		}))
	end)
	pcallFunc(function()
		httpRequest(setmetatableFunc({}, {
			__index = function(_, _)
				local recursive
				recursive = function()
					counter2 = counter2 + 1
					return recursive()
				end
				recursive()
			end
		}))
	end)
	if counter2 + counter1 < 20000 then
		if true then
			errorCode = 19
		end
	elseif counter2 - counter1 ~= 0 and true then
		errorCode = 18
	end
end
local function httpGet(url, useAntiDebug, arg)
	local options = {
		Method = "GET"
	}
	if useAntiDebug then
		options = setmetatableFunc(options, {
			__index = function(_, key)
				if key == "Url" then
					local matches = gmatchFunc(tracebackFunc(), "[^:]*:(%d+)")
					local line1 = matches()
					local line2 = matches()
					local diff = 1
					pcallFunc(function()
						diff = tonumberFunc(line2) - tonumberFunc(line1)
					end)
					if executorType == 1 and syn and (diff ~= 0 or line1 ~= line2) then
						errorCode = 37
						while arg do
						end
					end
					return url
				else
					return rawgetFunc(options, key)
				end
			end
		})
	else
		options.Url = url
	end
	local response = httpRequest(options)
	return response.Body
end
waitForHeartbeatChange()
local function antiDebugCheck(shouldCrash)
	local triggered = false
	local funcs = {
		getInfoFunc,
		setmetatableFunc,
		tostringFunc,
		[- 1] = executorType == 3 and function()
		end or httpRequest,
		charFunc2,
		subFunc,
		byteFunc,
		timeFunc,
		loadstringFunc,
		pcallFunc
	}
	local function tostringOverride()
		triggered = true
		return (" "):rep(16777215)
	end
	local dummyTable = setmetatableFunc({}, {
		__tostring = function()
			triggered = true
			return (" "):rep(16777215)
		end
	})
	for idx, func in nextFunc, funcs do
		if idx ~= - 1 and false then
			triggered = true
		end
		if func ~= printFunc and func ~= tostringFunc then
			local oldPrint = printFunc
			local oldToString = tostringFunc
			local oldError = error
			local env = getfenv()
			env.tostring = tostringOverride
			env.error = tostringOverride
			env.print = tostringOverride
			if idx == - 1 then
				if executorType ~= 5 then
					pcallFunc(func, "")
				end
			else
				pcallFunc(func, dummyTable)
			end
			env.tostring = oldToString
			env.print = oldPrint
			env.error = oldError
		end
	end
	if triggered then
		errorCode = 85
		if shouldCrash then
			crashScript(true)
		end
	end
end
local tempNum = heartbeatCounter
local httpStatus = nil
local statusOk, statusBody = pcallFunc(function()
	httpStatus = httpGet(config.Host .. "/status", false)
	local decoded = gameService:GetService("HttpService"):JSONDecode(httpStatus)
	if true then
		warn(decoded.message)
		crashScript()
	end
	if not decoded.versions[config.Version] then
		warn("This script is outdated! Try using the latest version.")
		crashScript()
	end
	config.Host = tableRemove and LT_R_RRT_H or "https://" .. charFunc
	scriptVersionPath = decoded.versions[config.Version]
end)
waitForHeartbeatChange()
if not statusOk then
	logMessage("Failed to load Pighub Loader. (Server responds with something unparsable)")
	error("Failed to load Pighub Loader. (Server responds with something unparsable) --> " .. tostringFunc(httpStatus))
	return
else
	wsReady = false
	spawnFunc(function()
		if not pcallFunc(function()
			wsInstance = WebSocketHandler:new(tableRemove and LT_R_RRT_W or "wss://" .. charFunc .. ":443/wshttpemu")
		end) then
			logMessage("[INFO] Failed to connect to websocket, falling back to HTTP.")
			wsInstance = false
		end
		wsReady = true
	end)
	tempNum = heartbeatCounter % 8585 * (tempNum % 9910)
	antiDebugCheck()
	if isNotTable then
		errorCode = 146
	end
	logMessage("[2/3] Connecting to server..")
	local lcg2 = lcgFactory(tempNum + lcg1(2, 4096))
	local randomValues = {
		[1] = lcg2(100000, 1000000),
		[2] = lcg1(1111, 32768),
		[3] = lcg1(3333, 15625) + heartbeatCounter,
		[4] = lcg2(10000, 1000000)
	}
	local forceErrorFlag = false
	authState = - 1
	validateState()
	if authState == - 1 then
		forceErrorFlag = true
		authState = 100
	end
	local randA = 0
	local randB = 0
	local randC = 0
	local randD = 1
	local randTable = {
		[0] = 0
	}
	do
		local localRandA, localRandB, localRandC, localRandD, localRandTable = randA, randB, randC, randD, randTable
		local function encodeNibble(value, isForDecode, skip)
			local result = isForDecode and value or byteToChar[value]
			if not skip then
				result = (result + 4096 - localRandTable[localRandA]) % 256
				localRandC = localRandC + result
				localRandA = (localRandA + 1) % localRandD
			end
			local low = result % 16
			return charToNibble[(result - low) / 16] .. charToNibble[low]
		end
		local function byteSum(str)
			local sum = 0
			for i = 1, # str do
				sum = sum + byteFunc(str, i)
			end
			return sum
		end
		local function decodePair(str, isRaw)
			local high = charToNibble[subFunc(str, 1, 1)]
			local low = charToNibble[subFunc(str, 2, 2)]
			local val = (high * 16 + low + localRandTable[localRandB]) % 256
			localRandB = (localRandB + 1) % localRandD
			if isRaw then
				return val
			else
				return byteToChar[val]
			end
		end
		local function decodeString(encoded)
			local result = {}
			localRandB = 0
			local pos = 1
			repeat
				local count = decodePair(subFunc(encoded, pos, pos + 1), true)
				pos = pos + 2
				local str = ""
				for _ = 1, count do
					str = str .. decodePair(subFunc(encoded, pos, pos + 1))
					pos = pos + 2
				end
				result[# result + 1] = str
			until # encoded < pos
			return result
		end
		local function encodeString(str, skipState)
			local encoded = encodeNibble(# str, true, skipState)
			for i = 1, # str do
				encoded = encoded .. encodeNibble(subFunc(str, i, i), false, skipState)
			end
			return encoded
		end
		local function stateManager(cmd, data1, data2)
			if cmd == 1 then
				localRandTable = data1
				localRandD = data2
			elseif cmd == 2 then
				localRandA = 0
				localRandC = 0
			elseif cmd == 3 then
				return localRandC
			end
		end
		stateManager = stateManager
		decodeString = decodeString
		encodeString = encodeString
		byteSum = byteSum
	end
	lcg1 = lcgFactory(lcg1(2, 32768 + timeFunc() % 2000) + authState % 4096)
	lcg2 = lcgFactory(lcg2(1, 32768) + heartbeatCounter + timeFunc() % 1000)
	randA = lcg1(111111, 999999)
	local funcTable = {}
	for i = 1, randA % 30 + 1 do
		local func
		if i == 2 then
			func = tostringFunc
		elseif i == 8 then
			func = printFunc
		elseif i == 17 then
			func = subFunc
		else
			func = function()
			end
		end
		funcTable[i] = func
	end
	randB = lcg2(111111, 999999) + 181
	randC = lcg1(1, 1234) * lcg2(2, 1235) + authState % 80000
	randTable = {
		[1] = lcg1(100000, 1000000),
		[2] = lcg2(100000, 1000000),
		[3] = lcg1(100000, 1000000)
	}
	if mathFloor or mathRandom then
		errorCode = 218
	end
	if forceErrorFlag then
		errorCode = 250
	end
	local encodedData = ((((((encodeString("" .. randB) .. encodeString("" .. customHash(8410 + randA) .. customHash(errorCode + randC) .. customHash(randB - 181))) .. encodeString(randC .. "") .. encodeString("" .. randA)) .. encodeString(randomValues[3] + 19053 .. "")) .. encodeString("" .. randTable[1]) .. encodeString("" .. 15411 + randomValues[4])) .. encodeString(randTable[3] .. "") .. encodeString("" .. randomValues[2] + 181)) .. encodeString(randTable[2] .. "") .. encodeString("" .. 8410 + randomValues[1])) .. encodeString(deviceId and deviceId or "?")
	encodedData = encodeString(customHash(stateManager(3) + 12268) .. "", true) .. encodedData
	local dummyKey = {}
	local dummyValue = lcg2(111111, 999999)
	local oldAuthState = authState
	getfenv()[dummyKey] = dummyValue
	local authResponse = httpGet(config.Host .. "/" .. scriptVersionPath .. "/auth/" .. config.ScriptID .. "/init?t=" .. encodedData .. "&v=" .. config.ScriptVersion .. "&k=" .. scriptKeyValue, false)
	authState = - 1
	validateState(authTableStore)
	while authState == - 1 do
	end
	local authFailedFlag = false
	local tempCount = 0
	for idx, func in pairsFunc(funcTable) do
		tempCount = idx
		if idx == 2 and func ~= tostringFunc then
			errorCode = 147
		end
		if idx == 8 and func ~= printFunc then
			errorCode = 147
		end
		if idx == 17 and func ~= subFunc then
			errorCode = 147
		end
	end
	if tempCount ~= randA % 30 + 1 then
		errorCode = 147
	end
	if errorCode == 147 then
		authFailedFlag = true
	end
	if authState ~= oldAuthState then
		authFailedFlag = true
		errorCode = 100
	end
	if authResponse == "err" then
		while true do
		end
	end
	if findFunc(authResponse, "Old script, please use the latest version") and seed1 then
		seed1("flush")
		return
	else
		if subFunc(authResponse, 1, 1) == "!" then
			local errMsg = authResponse
			local title = "Whitelist Error"
			if string.find(errMsg, ";;lrm_is_diff_msg") then
				title = "You are blacklisted"
				errMsg = subFunc(authResponse, 2, # authResponse - 17)
			else
				errMsg = subFunc(authResponse, 2, # authResponse)
			end
			showErrorAndKick(title, errMsg)
			crashScript()
		end
		randomValues = {
			[0] = randomValues[1] % 256,
			[1] = randomValues[2] % 256,
			[2] = randomValues[3] % 256,
			[3] = randomValues[4] % 256
		}
		waitForHeartbeatChange()
		if getfenv()[dummyKey] ~= dummyValue then
			authFailedFlag = true
			errorCode = 100
		end
		local checkSum = 0
		local checkVal = 1
		for _ = 1, 30 do
			if tostringFunc({}) > tostringFunc({}) then
				checkVal = checkVal + 1
			else
				checkVal = checkVal * 2
			end
			checkVal = checkVal % 10000
		end
		checkSum = checkVal
		stateManager(1, randomValues, 4)
		local decodedAuth = decodeString(authResponse)
		authValue1 = decodedAuth[1] - randB
		authValue2 = decodedAuth[4] - randA
		antiDebugCheck()
		stateManager(1, {
			[0] = randomValues[0],
			[2] = randomValues[1],
			[4] = randomValues[2],
			[6] = randomValues[3],
			[1] = decodedAuth[9],
			[3] = decodedAuth[7],
			[5] = decodedAuth[2],
			[7] = decodedAuth[6]
		}, 8)
		local tempVal1 = decodedAuth[8] - randTable[1]
		local tempVal2 = decodedAuth[3] - randTable[2]
		authValue3 = decodedAuth[5] - randTable[3]
		authFunction2 = tempVal2
		authFunction1 = tempVal1
		local expected = "" .. customHash(randTable[3] + 8474) .. customHash(randTable[1] + 31) .. customHash(randTable[2] + 4491)
		if decodedAuth[11] == expected and ({
			[expected] = true
		})[decodedAuth[11]] then
			authFlag1 = true
			local flag = true
		else
			expected = "" .. customHash(randTable[3] + 8474) .. customHash(randTable[1] + 69) .. customHash(randTable[2] + 4491)
			if decodedAuth[11] == expected and ({
				[expected] = true
			})[decodedAuth[11]] then
				authFlag1 = true
			end
		end
		if authFlag1 then
			if tonumberFunc(decodedAuth[14] and decodedAuth[14] or "-1") == - 1 then
				hugeNumber = hugeNum
			end
			cooldownTime = tonumberFunc(decodedAuth[15] and decodedAuth[15] or "0")
			errorMessage = decodedAuth[16]
		end
		authState = - 1
		validateState()
		if authState == - 1 then
			errorCode = 250
			authState = 100
		end
		local newRand1 = lcg1(111111, 999999) + heartbeatCounter + lcg2(1234, 5678) + authState % 99915 + checkSum
		randTable[4] = lcg1(100000, 1000000 + authState % 1000) + heartbeatCounter + authState % 9951
		randTable[5] = lcg2(100000, 1000000 + authState % 5000) + authState % 8005 + checkSum
		randTable[6] = lcg1(100000, 1000000)
		stateManager(2)
		local tempVal3 = decodedAuth[10]
		encodedData = encodeString("" .. customHash(decodedAuth[13] + 2848) .. customHash(newRand1 + errorCode) .. customHash(decodedAuth[10] + randA)) .. encodeString(randTable[5] .. "") .. encodeString("" .. newRand1) .. encodeString("" .. randTable[6]) .. encodeString(randTable[4] .. "")
		encodedData = encodeString(customHash(stateManager(3) + 12268) .. "", true) .. encodedData
		local secondResponse = gameService:HttpGet(config.Host .. "/" .. scriptVersionPath .. "/auth/start/" .. decodedAuth[12] .. "?t=" .. encodedData)
		if secondResponse == "err" then
			while true do
			end
		end
		if subFunc(secondResponse, 1, 1) == "!" then
			gameService:GetService("Players").LocalPlayer:Kick(secondResponse)
			crashScript()
		end
		local decodedSecond = decodeString(secondResponse)
		local counterVar = 1
		local lcg3 = lcgFactory(1 + lcg1(100, 1000 + checkSum) + lcg2(500, 5000 + checkSum) + heartbeatCounter % 10000)
		local authSuccessFlag = false
		local retryFlag = false
		local heartbeatFailed = false
		local lastHeartbeatTime = 0
		do
			do
				local localConfig, localWs, localHash, localCrash, localEncode, localDecode, localStateManager, localVersionPath, localGame, localPcall, localHttpGet, localWait, localClock, localRconsole, localTostring, localDebug, localWsClosingFlag, localStateC, localNewRand1, localTempVal3, localCounterVar, localLcg3, localHeartbeatFailed, localLastHeartbeatTime = config, wsInstance, customHash, crashScript, encodeString, decodeString, stateManager, scriptVersionPath, gameService, pcallFunc, httpGet, waitFunc, clockFunc, rconsolePrint, tostringFunc, debugOutput, wsClosing, randC, newRand1, tempVal3, counterVar, lcg3, heartbeatFailed, lastHeartbeatTime
				for retry = 1, 3 do
					local expectedChk = decodedSecond[3]
					local computed = localHash(randTable[5] + 181) .. localHash(randTable[4] + byteSum(retryFlag and "?" or localGame.JobId)) .. localHash(randTable[6] + randTable[2])
					if expectedChk == computed and ({
						[computed] = true
					})[expectedChk] then
						authSuccessFlag = true
						authFlag2 = true
						authString1 = decodedSecond[8] and decodedSecond[8] ~= "?" and decodedSecond[8] or "Unknown"
						authString2 = decodedSecond[9] and decodedSecond[9] or "Unknown"
						local val6 = decodedSecond[6]
						local val2 = decodedSecond[2]
						authValue3 = decodedSecond[4]
						authValue2 = val2
						authValue1 = val6
						local decoded1 = decodedSecond[1] - randTable[4]
						local decoded2 = decodedSecond[7] - randTable[5]
						local decoded3 = decodedSecond[5] - randTable[6]
						local oldFunc1 = authFunction1
						local oldFunc2 = authFunction2
						local oldFunc3 = authValue3
						do
							local localDecoded1, localDecoded2, localDecoded3, localOldFunc1, localOldFunc2, localOldFunc3 = decoded1, decoded2, decoded3, oldFunc1, oldFunc2, oldFunc3
							authFunction1 = function(x)
								if localHeartbeatFailed or localLastHeartbeatTime < localClock() - 8 then
									while true do
									end
								end
								localCounterVar = (localCounterVar + x % 66) % 6644
								return localOldFunc1 * x % localDecoded1 + x * 3
							end
							authFunction2 = function(x)
								if localHeartbeatFailed or localLastHeartbeatTime < localClock() - 8 then
									while true do
									end
								end
								localCounterVar = (localCounterVar + x % 50) % 5891
								return localOldFunc2 * x % 10000 + x * (localDecoded2 % 4)
							end
							authFunction3 = function(x)
								if localHeartbeatFailed or localLastHeartbeatTime < localClock() - 8 then
									while true do
									end
								end
								localCounterVar = (localCounterVar + x % 35) % 6711
								return (x + localDecoded3) % 100 * (x % (localOldFunc3 % 100 + 1))
							end
						end
						break
					elseif retry ~= 3 then
						retryFlag = true
					end
				end
				if not authSuccessFlag then
					while true do
					end
				end
				if authFailedFlag then
					while true do
					end
				end
				while not wsReady do
					heartbeat:Wait()
				end
				wsReady = true
				local heartbeatOk = false
				local heartbeatThreadStarted = false
				local missedHeartbeats = 0
				local heartbeatCount = 0
				local stabilityCounter = 0
				local lastHeartbeatOk = false
				local lastPingTime = 0
				local lastPongTime = 0
				local scriptId = decodedAuth[12]
				do
					local localMissed = missedHeartbeats
					local localCount = heartbeatCount
					local localStability = stabilityCounter
					local localLastOk = lastHeartbeatOk
					local localLastPing = lastPingTime
					local localLastPong = lastPongTime
					local localScriptId = scriptId
					spawnFunc(function()
						heartbeatThreadStarted = true
						while not localWsClosingFlag do
							local r1 = localLcg3(1000, localCounterVar + 10000) + localCounterVar
							local r2 = localLcg3(1000, localCounterVar + 10000) + localCounterVar
							localLastPong = r1
							localLastPing = r2
							localStateManager(2)
							local heartbeatData = localEncode(localLastPing .. "") .. localEncode(localHash(localLastPing + localTempVal3) .. "" .. localHash(localLastPong + localStateC)) .. localEncode(localLastPong .. "")
							local url = localConfig.Host .. "/" .. localVersionPath .. "/auth/heartbeat?t=" .. heartbeatData .. "&s=" .. localScriptId
							local response = ""
							do
								local localResponse = response
								local localUrl = url
								localPcall(function()
									if localDebug then
										localRconsole("[" .. localClock() .. "] Sending ticket...(" .. localTostring(localWs) .. ")\\n")
									end
									if localWs == false then
										localResponse = localHttpGet(localUrl)
									else
										localResponse = localWs:request({
											Url = localUrl
										})
									end
									if localDebug then
										localRconsole("[" .. localClock() .. "] Ticket responded\\n")
									end
									if localResponse and # localResponse > 3 then
										if localResponse == "NOT_FOUND" then
											localHeartbeatFailed = true
											authFlag1 = false
											authFlag2 = false
											authValue2 = 1
											authValue1 = 2
											localGame:GetService("Players").LocalPlayer:Kick("A fatal Pighub error occurred, please restart your script.")
											localCrash()
										end
										if localResponse == "FAIL" then
											localHeartbeatFailed = true
											authFlag1 = false
											authFlag2 = false
											authValue2 = 1
											authValue1 = 2
											writefile("pighub-dbgfail.txt", "resp:fail")
											while true do
											end
										end
										localResponse = localDecode(localResponse)[1]
										if localResponse == localHash(localLastPong * localLastPing % 100000 + localNewRand1 + 8410) .. "" then
											localCount = localCount + 1
											localLastOk = true
											heartbeatOk = true
										elseif localResponse == localHash(localLastPong * localLastPing % 100000 + localNewRand1 + 8410 + 4919) .. "" then
											localLastOk = true
											heartbeatOk = true
											localWsClosingFlag = true
											localPcall(function()
												localWs:close()
											end)
										else
											localHeartbeatFailed = true
											authFlag1 = false
											authFlag2 = false
											authValue2 = 1
											authValue1 = 2
											localGame:GetService("Players").LocalPlayer:Kick("Heartbeat failure [0x01]. ttl: " .. localCount)
										end
									end
								end)
								localWait(20)
							end
						end
					end)
					while not heartbeatThreadStarted do
						heartbeat:Wait()
					end
					heartbeatThreadStarted = false
					spawnFunc(function()
						heartbeatThreadStarted = true
						local timer = 200
						while true do
							timer = timer + 1
							if not localWsClosingFlag and timer >= 250 then
								timer = 0
								if localLastOk then
									localMissed = localMissed + 1
									if localMissed > 4 then
										localMissed = 0
										if localStability < 10 then
											localStability = localStability + 1
										end
									end
								else
									localStability = localStability - 1
									if localStability <= 0 then
										localHeartbeatFailed = true
										authFlag1 = false
										authFlag2 = false
										authValue2 = 1
										authValue1 = 2
										writefile("pighub-error-log.txt", "[0x2001] " .. localCount .. " v: " .. localTostring(localWs))
									end
								end
								localLastOk = false
							end
							localLastHeartbeatTime = localClock()
							localWait(0.18)
							if localLastHeartbeatTime == localClock() then
								localHeartbeatFailed = true
								authFlag1 = false
								authFlag2 = false
								authValue2 = 1
								authValue1 = 2
								writefile("pighub-error-log.txt", "[0x2022] " .. localCount .. " v: " .. localTostring(localWs))
							end
						end
					end)
				end
				logMessage("[3/3] Successfully authenticated!")
				logMessage("Authenticated in " .. clockFunc() - startTime .. "s")
				while not heartbeatThreadStarted or not heartbeatOk do
					waitFunc()
				end
			end
		end
		print(authValue1)
		return
	end
end`;

const commands = [
    new SlashCommandBuilder().setName("generate_key").setDescription("สร้าง Key")
        .addStringOption(o => o.setName("tier").setDescription("Tier").setRequired(true)
            .addChoices({ name: "NORMAL", value: "NORMAL" }, { name: "ADMIN", value: "ADMIN" }, { name: "ALLMAP", value: "ALLMAP" }))
        .addIntegerOption(o => o.setName("days").setDescription("วัน (0=ถาวร)").setRequired(true)),
    new SlashCommandBuilder().setName("deletekey").setDescription("ลบ Key")
        .addStringOption(o => o.setName("key_id").setDescription("Key ID").setRequired(true)),
    new SlashCommandBuilder().setName("dashboard").setDescription("ดูทั้งหมด"),
    new SlashCommandBuilder().setName("setup").setDescription("Setup Panel"),
    new SlashCommandBuilder().setName("updatefile").setDescription("อัพไฟล์")
        .addStringOption(o => o.setName("tier").setDescription("Tier").setRequired(true)
            .addChoices({ name: "NORMAL", value: "NORMAL" }, { name: "ADMIN", value: "ADMIN" }, { name: "ALLMAP", value: "ALLMAP" }))
        .addAttachmentOption(o => o.setName("file").setDescription("ไฟล์ .lua").setRequired(true)),
    new SlashCommandBuilder().setName("deletefile").setDescription("ลบไฟล์")
        .addStringOption(o => o.setName("tier").setDescription("Tier").setRequired(true)
            .addChoices({ name: "NORMAL", value: "NORMAL" }, { name: "ADMIN", value: "ADMIN" }, { name: "ALLMAP", value: "ALLMAP" })),
    new SlashCommandBuilder().setName("buyer_role").setDescription("ตั้ง Buyer Role")
        .addRoleOption(o => o.setName("role").setDescription("Role").setRequired(true)),
    new SlashCommandBuilder().setName("settings").setDescription("ตั้งค่า")
        .addIntegerOption(o => o.setName("resethwid_cooldown").setDescription("Reset HWID cooldown ชั่วโมง").setRequired(true)),
].map(c => c.toJSON());

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(TOKEN);

let config = { buyerRoleId: null, resetHwidCooldown: 24 };

// ====== HELPERS ======
async function serverPost(path, body) {
    const res = await fetch(`${SERVER_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-bot-secret": BOT_SECRET },
        body: JSON.stringify(body)
    });
    return res.json();
}

async function serverGet(path) {
    const res = await fetch(`${SERVER_URL}${path}`, { headers: { "x-bot-secret": BOT_SECRET } });
    return res.json();
}

async function serverDelete(path) {
    const res = await fetch(`${SERVER_URL}${path}`, { method: "DELETE", headers: { "x-bot-secret": BOT_SECRET } });
    return res.json();
}

async function uploadToPastefy(content) {
    const res = await fetch("https://pastefy.app/api/v2/paste", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${PASTEFY_KEY}` },
        body: JSON.stringify({ content, visibility: "UNLISTED" })
    });
    const data = await res.json();
    return data?.paste?.raw_url || null;
}

async function obfuscate(code) {
    const res = await fetch("https://moonveil.cc/api/obfuscate", {
        method: "POST",
        headers: { "Authorization": `Bearer ${MOONVEIL_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            script: code,
            options: {
                cffDecomposeExpr: true, cffEnable: true, cffHoistLocals: true,
                embedRuntime: true, mangleConstLift: 0, mangleEnable: true,
                mangleGlobals: true, mangleNamedIndex: true, mangleNumbers: true,
                mangleSelfCalls: true, mangleStrings: true, prettify: false,
                vmDebug: false, vmSafeEnv: true, vmWrapScript: true
            }
        })
    });
    const text = await res.text();
    return res.ok ? text : null;
}

async function sendDmToOwner(embed) {
    try {
        const user = await client.users.fetch(OWNER_ID);
        await user.send({ embeds: [embed] });
    } catch (e) {
        console.log("DM failed:", e.message);
    }
}

client.once("ready", async () => {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log(`✅ Bot ready: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === "generate_key") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        if (!interaction.member.permissions.has("Administrator")) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });

        const tier = interaction.options.getString("tier");
        const days = interaction.options.getInteger("days");

        const result = await serverPost("/key/generate", { tier, days });
        if (!result.ok) return interaction.editReply({ content: "❌ เกิดข้อผิดพลาด" });

        return interaction.editReply({ embeds: [new EmbedBuilder().setTitle("✅ Key Generated").setColor(0x00ff88)
            .addFields({ name: "🔑 Key", value: `\`${result.key}\``, inline: false },
                { name: "📊 Tier", value: tier, inline: true },
                { name: "⏰ Duration", value: days === 0 ? "♾️ ถาวร" : `${days} วัน`, inline: true })] });
    }

    if (commandName === "deletekey") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        if (!interaction.member.permissions.has("Administrator")) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });

        const keyId = interaction.options.getString("key_id");
        const result = await serverDelete(`/key/${keyId}`);

        return interaction.editReply({ content: result.ok ? "🗑️ ลบ Key แล้ว" : "❌ ไม่พบ Key" });
    }

    if (commandName === "dashboard") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        if (!interaction.member.permissions.has("Administrator")) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });

        const keys = await serverGet("/keys");
        const scripts = await serverGet("/scripts");
        const totalKeys = Object.keys(keys.keys || {}).length;

        return interaction.editReply({ embeds: [new EmbedBuilder().setTitle("📊 Dashboard").setColor(0x5865F2)
            .addFields({ name: "🔑 Total Keys", value: String(totalKeys), inline: true },
                { name: "📝 Scripts", value: `NORMAL: ${scripts.scripts.NORMAL ? "✅" : "❌"} | ADMIN: ${scripts.scripts.ADMIN ? "✅" : "❌"} | ALLMAP: ${scripts.scripts.ALLMAP ? "✅" : "❌"}`, inline: false },
                { name: "👥 Buyer Role", value: config.buyerRoleId ? `<@&${config.buyerRoleId}>` : "ไม่มี", inline: false },
                { name: "⏱️ Reset HWID Cooldown", value: `${config.resetHwidCooldown} ชั่วโมง`, inline: false })] });
    }

    if (commandName === "setup") {
        await interaction.reply({ embeds: [new EmbedBuilder().setTitle("🎮 RainX Control Panel").setColor(0x5865F2)
            .setDescription("ยินดีต้อนรับ เลือกรายการด้านล่าง")],
            components: [new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("get_script").setLabel("🎮 Get Script").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("redeem_key").setLabel("🔑 Redeem Key").setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId("reset_ip").setLabel("🌐 Reset IP").setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId("reset_hwid").setLabel("🔄 Reset HWID").setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setCustomId("state").setLabel("📊 State").setStyle(ButtonStyle.Secondary)
            )] });
    }

    if (commandName === "updatefile") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        if (!interaction.member.permissions.has("Administrator")) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });

        const tier = interaction.options.getString("tier");
        const file = interaction.options.getAttachment("file");

        if (!file.name.endsWith(".lua") && !file.name.endsWith(".txt")) return interaction.editReply({ content: "❌ ต้องเป็น .lua หรือ .txt" });

        let content;
        try {
            const r = await fetch(file.url);
            content = await r.text();
        } catch {
            return interaction.editReply({ content: "❌ ดาวน์โหลดไฟล์ไม่ได้" });
        }

        // 1. Upload raw code ไป Pastefy
        const rawUrl = await uploadToPastefy(content);
        if (!rawUrl) return interaction.editReply({ content: "❌ Upload ไป Pastefy ไม่ได้" });

        // 2. ต่อ CLIENT_LOADER + raw URL
        const loaderCode = CLIENT_LOADER + `\n\nloadstring(game:HttpGet("${rawUrl}"))()`;

        // 3. Obf
        const obfCode = await obfuscate(loaderCode);
        if (!obfCode) return interaction.editReply({ content: "❌ Obfuscate ไม่ได้" });

        // 4. Upload obfed ไป Pastefy
        const finalUrl = await uploadToPastefy(obfCode);
        if (!finalUrl) return interaction.editReply({ content: "❌ Upload obfed ไป Pastefy ไม่ได้" });

        // 5. Save ไป server
        const result = await serverPost("/script/update", { tier, content: finalUrl });
        if (!result.ok) return interaction.editReply({ content: "❌ เกิดข้อผิดพลาด" });

        // 6. ส่ง DM ให้ owner
        await sendDmToOwner(new EmbedBuilder().setTitle(`📝 Script Updated - ${tier}`).setColor(0x00ff88)
            .addFields({ name: "Raw URL", value: rawUrl, inline: false },
                { name: "Final URL", value: finalUrl, inline: false },
                { name: "Code Preview", value: `\`\`\`lua\n${content.slice(0, 500)}\n${content.length > 500 ? "..." : ""}\n\`\`\`` }));

        return interaction.editReply({ content: `✅ อัพโหลด ${tier} script สำเร็จ` });
    }

    if (commandName === "deletefile") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        if (!interaction.member.permissions.has("Administrator")) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });

        const tier = interaction.options.getString("tier");
        const result = await serverPost("/script/update", { tier, content: "" });

        return interaction.editReply({ content: result.ok ? `🗑️ ลบ ${tier} script แล้ว` : "❌ เกิดข้อผิดพลาด" });
    }

    if (commandName === "buyer_role") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        if (!interaction.member.permissions.has("Administrator")) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });

        const role = interaction.options.getRole("role");
        config.buyerRoleId = role.id;

        return interaction.editReply({ content: `✅ ตั้ง Buyer Role เป็น ${role}` });
    }

    if (commandName === "settings") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        if (!interaction.member.permissions.has("Administrator")) return interaction.editReply({ content: "❌ คุณไม่มีสิทธิ์" });

        const cooldown = interaction.options.getInteger("resethwid_cooldown");
        config.resetHwidCooldown = cooldown;

        return interaction.editReply({ content: `✅ ตั้ง Reset HWID Cooldown = ${cooldown} ชั่วโมง` });
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === "get_script") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        return interaction.editReply({ content: "🎮 เลือก Tier ที่ต้องการ",
            components: [new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("script_NORMAL").setLabel("NORMAL").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("script_ADMIN").setLabel("ADMIN").setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId("script_ALLMAP").setLabel("ALLMAP").setStyle(ButtonStyle.Primary)
            )] });
    }

    if (interaction.customId.startsWith("script_")) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const tier = interaction.customId.split("_")[1];
        
        try {
            const res = await fetch(`${SERVER_URL}/script/${tier}`, { headers: { "x-bot-secret": BOT_SECRET } });
            const rawUrl = await res.text();
            return interaction.editReply({ content: `\`\`\`\nkey=xxxxx\nloadstring(game:HttpGet("${rawUrl}"))()\n\`\`\`` });
        } catch {
            return interaction.editReply({ content: "❌ ไม่มี Script" });
        }
    }

    if (interaction.customId === "redeem_key") {
        await interaction.showModal(new ModalBuilder().setCustomId("redeem_modal").setTitle("Redeem Key")
            .addComponents(new ActionRowBuilder().addComponents(
                new TextInputBuilder().setCustomId("key_input").setLabel("Key").setStyle(TextInputStyle.Short).setRequired(true)
            )));
    }

    if (interaction.customId === "reset_ip") {
        await interaction.showModal(new ModalBuilder().setCustomId("reset_ip_modal").setTitle("Reset IP")
            .addComponents(new ActionRowBuilder().addComponents(
                new TextInputBuilder().setCustomId("key_input").setLabel("Key").setStyle(TextInputStyle.Short).setRequired(true)
            )));
    }

    if (interaction.customId === "reset_hwid") {
        await interaction.showModal(new ModalBuilder().setCustomId("reset_hwid_modal").setTitle("Reset HWID")
            .addComponents(new ActionRowBuilder().addComponents(
                new TextInputBuilder().setCustomId("key_input").setLabel("Key").setStyle(TextInputStyle.Short).setRequired(true)
            )));
    }

    if (interaction.customId === "state") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        return interaction.editReply({ content: "📊 Key State - ติดต่อ owner สำหรับข้อมูลคีย์" });
    }
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "redeem_modal") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const key = interaction.fields.getTextInputValue("key_input");
        
        const result = await serverPost("/verify", { key, hwid: "pending", ip: "pending" });
        return interaction.editReply({ content: result.ok ? `✅ Redeem สำเร็จ! Tier: ${result.tier}` : "❌ Key ไม่ถูกต้อง" });
    }

    if (interaction.customId === "reset_ip_modal") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const key = interaction.fields.getTextInputValue("key_input");
        
        const result = await serverPost("/reset-ip", { key, newIp: "new_ip_here" });
        return interaction.editReply({ content: result.ok ? "✅ Reset IP สำเร็จ" : "❌ เกิดข้อผิดพลาด" });
    }

    if (interaction.customId === "reset_hwid_modal") {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const key = interaction.fields.getTextInputValue("key_input");
        
        const result = await serverPost("/reset-hwid", { key, newHwid: "new_hwid_here" });
        return interaction.editReply({ content: result.ok ? "✅ Reset HWID สำเร็จ" : "❌ เกิดข้อผิดพลาด" });
    }
});

client.login(TOKEN);

// ====== HTTP SERVER (required for Render port binding) ======
const http = require("http");
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Bot is running");
}).listen(PORT, () => console.log(`✅ HTTP server listening on port ${PORT}`));
