import threading
from websocket_server import WebsocketServer

def new_client(client, server):
    print client["address"]
    server.send_message(client,client["address"][0]);

def delete_client(client, server):
    print "delete_client";
    server.send_message_to_all("Hey all, a   client has left us")
def data_client(client, server,msg):
    print msg;




class websocket_thread(threading.Thread):
    def __init__(self):
        super(websocket_thread, self).__init__()
        print 'websocket_thread __init__ !'
    def run(self):
        print 'websocket_thread run !'
        super(websocket_thread, self).__init__()
        server = WebsocketServer(9000, host='127.0.0.1')
        server.set_fn_new_client(new_client)
        server.set_fn_client_left(delete_client)
        server.set_fn_message_received(data_client)
        server.run_forever()

def initWebSocket():
    thread1 = websocket_thread()
    thread1.start()