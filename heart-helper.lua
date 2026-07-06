-- Сердце-донат: запускает помощника ВМЕСТЕ с OBS.
-- Открывай OBS как обычно (иконка/Steam/таскбар) — помощник поднимется сам,
-- а после закрытия OBS выключится сам (через ~15 сек, логика в server.js).
--
-- Поставить ОДИН раз: OBS -> Инструменты -> Скрипты -> вкладка "Скрипты" ->
-- кнопка "+" -> выбрать этот файл heart-helper.lua. Всё.
obs = obslua

function script_description()
  return "Сердце-донат: помощник запускается вместе с OBS и выключается после его закрытия. Открывай OBS как обычно."
end

function script_load(settings)
  local dir = string.gsub(script_path(), "/", "\\")   -- папка этого скрипта
  os.execute('wscript.exe "' .. dir .. '_run-helper.vbs"')
end
