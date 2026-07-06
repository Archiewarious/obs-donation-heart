' Служебный файл: запускает помощника "сердце-донат" НЕВИДИМО.
' Его вызывает скрипт внутри OBS (heart-helper.lua). Сам по себе запускать не нужно.
Set sh  = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
sh.CurrentDirectory = fso.GetParentFolderName(WScript.ScriptFullName)
sh.Run "node server.js", 0, False
