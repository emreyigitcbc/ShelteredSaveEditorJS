import eel
import xml.etree.ElementTree as ET
eel.init('web')
eel.start('main.html')

@eel.expose
def print_table_py(veri):
    c = open("cache_file", "w")
    c.write(veri)