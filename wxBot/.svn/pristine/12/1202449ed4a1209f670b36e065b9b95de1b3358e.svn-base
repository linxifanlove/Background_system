#!/usr/bin/env python
# coding: utf-8
from wxbot import *
import msgmoulde
import threading
import json

class MyWXBot(WXBot):
    def __init__(self):
        super(MyWXBot,self).__init__()

        self.curGroup="";
        self.gameState=0;
        self.player={};
        self.time=0;
        self.bankerTime=10;
        self.betTime=10;
        self.minBet=10
        self.curBanker=""
        self.totalBet=0;
        self.minBanker=100;
        self.readyAnpowTime=10
        self.betPlayerCount=0;


    def handle_msg_all(self, msg):
        if msg['msg_type_id'] == 3:
            msgmoulde.dealGroup(self, msg)
        elif msg['msg_type_id'] == 4:
            print  msg['content']['type']
            if msg['content']['type'] == 0:
                if msg['content']['data']=='reload':
                   # auto_reload("msgmoulde")
                   # auto_reload("socketClass")
                    return;
            msgmoulde.dealMsg(self,msg)
    def getPng(self):
        print "getPng"+self.imagePath;
        self.server.send_message(self.client,'{"id":"wxqr","url":"http://127.0.0.1/wxqr1.png"}');
    def getGroup_list(self):
        params = {
            'id': "getGroup",
            "List": [{"UserName": group['NickName']} for group in self.group_list]
        }
        self.server.send_message(self.client,json.dumps(params));

    def batch_get_group_members_by_name(self,client,gid):
        print "new ver1"
        curGroup=None;
        for group in self.group_list:
            if group['NickName']==gid :
                curGroup = group;
                self.curGroup= group["UserName"];
                break;
        if curGroup == None :
            self.server.send_message(client, "group is not exist");
            return;

        url = self.base_uri + '/webwxbatchgetcontact?type=ex&r=%s&pass_ticket=%s' % (int(time.time()), self.pass_ticket)
        params = {
            'BaseRequest': self.base_request,
            "Count": 1,
            "List": [{"UserName": curGroup['UserName'], "EncryChatRoomId": ""}]
        }
        r = self.session.post(url, data=json.dumps(params))
        r.encoding = 'utf-8'
        dic = json.loads(r.text)

        group1 = dic['ContactList'][0];
        for group in group1['MemberList'] :
            name=group['NickName'];
            self.player[name]={};
            self.player[name]['money']=1000;
            self.player[name]['bet']=0;
            self.player[name]['id']=0;

        params = {
            'id': "getMember",
            "List": [{"UserName": group['NickName']} for group in group1['MemberList']]
        }
        self.server.send_message(self.client, json.dumps(params));
        self.send_msg_by_uid(u"机器人已登录", self.curGroup);




class websocket_thread(threading.Thread):

    def __init__(self,client,server):
        super(websocket_thread, self).__init__()
        print 'websocket_thread __init__ !'
        self.client = client;
        self.bot = MyWXBot()
        self.bot.DEBUG = True
        self.bot.client = self.client;
        self.bot.imagePath = "D:\\kevin\\WEB\\wxqr1.png"
        self.bot.conf['qr'] = 'png'
        self.bot.is_big_contact = False
        self.bot.server=server;

    def run(self):
        print "run 1"
        self.bot.run()
        print "run end"

    def onMsg(self,client,msg):
        if msg['id'] == 'getMember':
            self.bot.batch_get_group_members_by_name(client,msg['data']);

    def timeProc(self,curtime):
        msgmoulde.timeProc( self.bot, curtime);