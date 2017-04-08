#!/usr/bin/env python
# coding: utf-8
import random
import MySQLdb
import socketClass
replys={};
replys['miss']='miss u too';
replys['hi']='hi,##';
replys['hey']='hi,##';
replys['hello']='hi,##';
replys['fuck']='shut up';
replys[u'吃饭']=u'还没呢';
replys[u'毛病']=u'你有药吗';
replys[u'忙']=u'忙死了';
replys[u'机器人']=u'你全家都是机器人';
replys[u'bye']=u'8...';
replys[u'不行']=u'不许拒绝我';
replys[u'唱歌']=u'两只老虎,两只老虎跑得快';
replys[u'忍']=u'事可忍,孰不可忍';
replys[u'骂人']=u'你想骂谁';
notUnderstand=[ u'what r u taking about?', u'I beg ur pardon?',u"what's up?",u'咯',u'...',\
                u"恩?",u"啊哈",u"不明白"];
whiteLists={};
whiteLists['Kevinares']=1;
whiteLists['Cecilia_']=1;
whiteLists['Kevin']=1;

def dealMsg(self,msg):
    if msg['content']['type'] == 0:
         str=msg['content']['data'].lower(); 
         if str==u'滚' :
            whiteLists[msg['user']['name']]=0;
            self.send_msg_by_uid(u'再见,'+msg["user"]["name"]+u",你会想我的", msg['user']['id'])
            self.send_msg_by_uid(u"如果真想我了,就打'回来'", msg['user']['id'])
            return;
         elif  str==u'回来':
              whiteLists[msg['user']['name']]=1
              self.send_msg_by_uid(u"我就知道你会想我的", msg['user']['id'])
              return;
         elif str==u'sql':
             openDatabase();
             return;
         elif str==u"web":
             socketClass.initWebSocket();
             return;
         if whiteLists[msg['user']['name']]==1 :
            find=0;
            for index, item in replys.items():      # 第二个实例
                if index in str :
                    if '##' in item:
                        item=item.replace('##',msg["user"]["name"]);
                    self.send_msg_by_uid(item, msg['user']['id'])
                    find=1;
                    break
            if find== 0 :
                self.send_msg_by_uid(random.choice(notUnderstand), msg['user']['id'])

    elif msg['content']['type'] == 4:
        if whiteLists[msg['user']['name']]==1 :
            self.send_msg_by_uid(u'口音太重,听不懂...', msg['user']['id'])
    elif msg['content']['type'] == 6:
        if whiteLists[msg['user']['name']]==1 :
            self.send_msg_by_uid(u'...', msg['user']['id'])
groupMsgType=["txt","location","img","voice","card","ani","share","video","phone","Redraw","null","angpow","small video"];
def dealGroup(self ,msg):
    if msg["user"]["name"] == u"unknown":
        msg["user"]["name"]=msg["user"]["id"]
    print  msg['content']["user"]["name"]+"@"+msg["user"]["name"] +" : "+groupMsgType[msg['content']['type']]+" : "+msg['content']['data']
"""
Kevinares@@@5e3c2dd907a1136c5f7d7682742bc540c4b8f65b8f967e31293945b90046a2d5 : txt : dsafds
"""
def openDatabase():
    conn = MySQLdb.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='0000',
        db='maui',
    )
    cur = conn.cursor()
    sql="insert into userInfo(name,credit) values('kevin',100)"
    try:
        cur.execute(sql)
        conn.commit()
    except:
        conn.rollback()
    conn.close()
    print "sql suc";
    
