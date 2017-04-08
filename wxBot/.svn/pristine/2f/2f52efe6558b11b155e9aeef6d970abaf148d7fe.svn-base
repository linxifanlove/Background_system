import threading
import json
import MySQLdb
from websocket_server import WebsocketServer
global dataBaseConn;
def new_client(client, server):
    print client["address"]
    a={};
    a['address']=client['address'][0];
    a['port'] = client['address'][1];
    server.send_message(client,json.dumps(a));

def delete_client(client, server):
    print "delete_client";
    server.send_message_to_all("Hey all, a   client has left us")
def data_client(client, server,msg):
    print msg;
    x= json.loads(msg);
    sql = "insert into betrecord (betvalue,win,result,bankerid,banker_result,type)\
            values(1,2,100,11,111,1)";

    runSql(sql);



class websocket_thread(threading.Thread):
    def __init__(self):
        super(websocket_thread, self).__init__()
        print 'websocket_thread __init__ !'
    def run(self):
        print 'websocket_thread run !'
        super(websocket_thread, self).__init__()
        server = WebsocketServer(9000, host='192.168.1.22')
        server.set_fn_new_client(new_client)
        server.set_fn_client_left(delete_client)
        server.set_fn_message_received(data_client)
        server.run_forever()


def closeDataBase():
    global dataBaseConn;
    dataBaseConn.close()


def runSql(sql):
    global dataBaseConn;
    try:
        cur = dataBaseConn.cursor()
        cur.execute(sql)
        dataBaseConn.commit()
    except:
        print "runSql exception"
       # dataBaseConn.rollback()


def openDatabase():
    global dataBaseConn;
    dataBaseConn = MySQLdb.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='0000',
        db='maui',
    )

openDatabase();
thread1 = websocket_thread()
thread1.start()

print "run here"
while True:
    a=1
closeDataBase();