#!/usr/bin/env python
# coding: utf-8
import mainGame
from wxbot import *
from websocket_server import WebsocketServer
import json
import msgmoulde
import multiprocessing
import threading
threadList=[];

def auto_reload(name):

    mods = [name] # the need reload modules
    for mod in mods:
        try:
            module = sys.modules[mod]
        except:
            continue
        filename = module.__file__
        print filename
        try:
             reload(module)
        except:
            pass



def initWebSocket():
    thread1 = websocket_thread()
    thread1.start()

def new_client(client, server):
    global g_server;

def delete_client(client, server):
    global g_server;
    print "delete_client";
def data_client(client, server,msg):
    print "data_client:"+msg;
    x = json.loads(msg);
    global g_server;
    global thread1;
    global thread12;
    if x['id'] == "reload":
        auto_reload("msgmoulde")
        if not thread12.isAlive() :
            thread12 = time_thread()
            thread12.start();

    elif  x['id'] == "start robot":
        thread1 = mainGame.websocket_thread(client,g_server)
        thread1.start()
        threadList.append(thread1);
    else:
        thread1.onMsg(client,x)
class time_thread(threading.Thread):
    def __init__(self  ):
        super(time_thread, self).__init__()
        print 'time_thread __init__ !'

    def run(self):
        while True:
            curtime = time.time();
            for thread in threadList:
                thread.timeProc(curtime);
            time.sleep(1)



if __name__ == '__main__':
    global thread12;
    thread12 = time_thread()
    thread12.start()
    global g_server;
    g_server= WebsocketServer(9000, host='192.168.1.24')
    g_server.set_fn_new_client(new_client)
    g_server.set_fn_client_left(delete_client)
    g_server.set_fn_message_received(data_client)
    g_server.run_forever()



