# -*- coding: utf-8 -*-
import json

def userLogin(jsondata):
    #jsondata['username'] 用户名 password 密码 checkcode验证码
    #检查验证码是否正确
    #查询数据库玩家是否存在 密码是否正确
    #返回数据

    data = {
        'id': 'login',
        'state': 1,
        'message': u"正常登录"
    }
    ret = json.dumps(data)
    return ret


def getWxqr(jsondata):
    #jsondata['username'] 用户名 password 密码 checkcode验证码
    #检查验证码是否正确
    #查询数据库玩家是否存在 密码是否正确
    #返回数据

    data = {
        'id': 'wxqr',
        'url': "http://wx.qlogo.cn/mmhead/ver_1/fT7ia9sgcqomyS3uFxg0YYY8KI3OT6cwgYLVywoPwFY6vTicTOpDd9viaeFSS0AibwdRgBiahsiatNobhSuou1DPaQpv1CkTQRALibwUksiby7hiaxqw/132"
    }
    ret = json.dumps(data)
    return ret

def GameRoomGameList(jsondata):
    #jsondata['username'] 用户名
    #查库后返回用户信息
    data = {
        'id': 'GameRoomGameList',
        'dmMchMoney': 0.00,
        'dmPlayersMoney':  34749.50,
        'price': 542.23,
        'nGameId': 1,
        'nGameRoomId':1857,
        'nVerCount': 0,
        'nYunPoint': 300,
        'vcBetNickName': '',
        'vcChatRoomId': '7773587735@chatroom',
        'vcHeadImgUrl': 'http://wx.qlogo.cn/mmhead/ver_1/7yAuAfVJpD9FWC5DP3oMfPric8xtwwLAt2mqOYRDnXPoicxh8cYoBw4CiaEib6Tc3cb6MNhU9ibSxuQnzLfr3hNfDVA/96',
        'vcPassWord': '5349d2cf',
        'vcUserName': 'G14190701857',
        'gameGroup':[{'vcBase64WeixinName':'5rWL6K+V57uT5p6c', 'vcChatRoomId': '8173587320@chatroom'},
                     {'vcBase64WeixinName': '5rWL6K+V5ZWK5L2g', 'vcChatRoomId': '7773587735@chatroom' }],
    }
    ret = json.dumps(data)
    return ret


def RoomUserList(jsondata):
    #jsondata['username'] 用户名
    #查库后返回用户信息
    data = {
        'id': 'RoomUserList',
        'nNotice': 1, #上分成功群内通知
        'dmTotalMoney':  34749.50,
        'userList':[{
                    'dmMoney':12408.00,
                    'nIsRoomUser':1, #判断该会员是否属于群内
                    'nMemberId':146475,
                    'nUserId':146475,
                    'vcBase64WeixinName':'5p6X576954S2',
                    'vcBetNickName':'',
                    'vcHeadImgUrl':'http://wx.qlogo.cn/mmhead/ver_1/m5TQsc3K3VGwcEzT7vibxfU2RRMISRmXVj3HEGNGQ2sSJ2KnnfXp8xB6yIDXUIxN5g0U2e10TALzCB61OticRK4n6ibKZkicBwhup8Ry3EIZTDE/132'
                    },
                {
                    'dmMoney': 10000.00,
                    'nIsRoomUser': 1,
                    'nMemberId': 142016,
                    'nUserId': 142016,
                    'vcBase64WeixinName': 'S2V2aW4=',
                    'vcBetNickName': '',
                    'vcHeadImgUrl': 'http://wx.qlogo.cn/mmhead/ver_1/fT7ia9sgcqomyS3uFxg0YYY8KI3OT6cwgYLVywoPwFY6vTicTOpDd9viaeFSS0AibwdRgBiahsiatNobhSuou1DPaQpv1CkTQRALibwUksiby7hiaxqw/132'
                },

                {
                    'dmMoney': 10000.00,
                    'nIsRoomUser': 1,
                    'nMemberId': 142111,
                    'nUserId': 142111,
                    'vcBase64WeixinName': 'Q2VjaWxpYV8=',
                    'vcBetNickName': '',
                    'vcHeadImgUrl': 'http://wx.qlogo.cn/mmhead/ver_1/Fmwf2nD8AErick6v0LeZzOexwbWQFoSacCDHyHdlmRmHfGdmQiaYGulPhVcbHkNWbEGwwN0v8hia7LWVwYnFic7TQcAhQCFrxZvr59Ztzmrn7Vo/132'
                },
        ],
    }
    ret = json.dumps(data)
    return ret

def AddMoneys(jsondata):
    #客户端上传加减分信息
    print 'AddMoneys = '
    print jsondata['data'][0]['nMemberId']
    print jsondata['data'][0]['nUserId']
    print jsondata['data'][0]['nValue'] #金钱数

    data = {
        'id': 'AddMoneys',
        'state': 1,
        'message': u"余额不足",
        'retList': [
            {
                'nMemberId': 146475,
                'dmCurMoney': 12538.00,
            },
            {
                'nMemberId': 142016,
                'dmCurMoney': 12310.00,
            }
        ]
    }
    ret = json.dumps(data)
    return ret

def MoneyGoldList(jsondata):
    #获取玩家分数
    data = {
        'id': 'MoneyGoldList',
        'retList': [
            {
                'vcBetNickName': '',
                'dmMoney': 12508.00,
                'nGoldAmount':0,
                'vcBase64WeixinName':'5p6X576954S2',
            },
            {
                'vcBetNickName': '',
                'dmMoney': 10010.00,
                'nGoldAmount':0,
                'vcBase64WeixinName':'S2V2aW4=',
            }
        ]
    }
    ret = json.dumps(data)
    return ret