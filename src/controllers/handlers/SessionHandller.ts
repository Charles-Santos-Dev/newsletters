import {JsonController, Param, Body, Get, Post, Put, Delete, createExpressServer, Req, Res} from "routing-controllers";

const sessionstorage = require('sessionstorage');

@JsonController()
export  class SessionHandller {

    setSession(user) {
        let KeyUser = this.setToken(58);
        let expire  = this.sessionExpire(15);
        let ObjectSession = {expire : expire, nome : user.nome, id : user.id, permissao : user.permissao};

        sessionstorage.setItem(KeyUser, ObjectSession);

        return KeyUser;
    }

    getSession(KeyUser) {
        return sessionstorage.getItem(KeyUser);
    }

    setToken(length) {
        var ret = "";
        while (ret.length < length) {
            ret += Math.random().toString(15).substring(2);
        }
        return ret.substring(0,length);
    }

    sessionExpire(hoursExpire) {
        const DateTime = new Date();

        let CurrentYear       = DateTime.getFullYear();
        let CurrentMonth      = DateTime.getMonth();
        let CurrentDay        = DateTime.getDate();
        let CurrentHour       = DateTime.getHours() + hoursExpire;
        let amountDaysInMonth = new Date(CurrentYear, CurrentMonth, 0).getDate();
        let _CurrentMnutes     = DateTime.getMinutes();
        let _CurrentSeconds    = DateTime.getSeconds();
        let _CurrentYear;
        let _CurrentMonth;
        let _CurrentDay;
        let _CurrentHour;

        if(CurrentHour > 24){
            _CurrentHour = CurrentHour - 24;
            CurrentDay += 1;
            if(CurrentDay > amountDaysInMonth){
                _CurrentDay = CurrentDay - amountDaysInMonth;
                CurrentMonth += 1;
                if(CurrentMonth > 12){
                    _CurrentMonth = 1;
                    _CurrentYear  = CurrentYear + 1;
                } else {
                    _CurrentMonth = CurrentMonth;
                    _CurrentYear  = CurrentYear;
                }
            } else {
                _CurrentMonth = CurrentMonth;
                _CurrentYear  = CurrentYear;
                _CurrentDay   = CurrentDay;
            }
        } else {
            _CurrentYear  = CurrentYear;
            _CurrentMonth = CurrentMonth;
            _CurrentDay   = CurrentDay;
            _CurrentHour  = CurrentHour;
        }

        if(_CurrentHour < 10){
            _CurrentHour = '0' + _CurrentHour;
        }
        if(_CurrentDay < 10){
            _CurrentDay = '0' + _CurrentDay;
        }
        if(_CurrentMonth < 10){
            _CurrentMonth = '0' + _CurrentMonth;
        }

        return `${_CurrentDay}/${_CurrentMonth}/${_CurrentYear}:${_CurrentHour}:${_CurrentMnutes}:${_CurrentSeconds}`;
    }

    checkPermission(KeyUser){
        if(this.getSession(KeyUser)){
            if (this.getSession(KeyUser).permissao){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    clearSession(KeyUser) {
        sessionstorage.removeItem(KeyUser);

        return 'clear session';
    }
    clearAllSession() {
        sessionstorage.clear();

        return 'clear all sessions';
    }

    sessionCheck(KeyUser) {
        const DateTime = new Date();

        let CurrentYear       = DateTime.getFullYear();
        let CurrentMonth      = DateTime.getMonth();
        let CurrentDay        = DateTime.getDate();
        let CurrentHour       = DateTime.getHours();
        let CurrentMnutes     = DateTime.getMinutes();
        let CurrentSeconds    = DateTime.getSeconds();
        let _CurrentHour;
        let _CurrentDay;
        let _CurrentMonth;

        if(CurrentHour < 10){
            _CurrentHour = '0' + CurrentHour;
        } else {
            _CurrentHour = CurrentHour;
        }
        if(CurrentDay < 10){
            _CurrentDay = '0' + CurrentDay;
        } else {
            _CurrentDay = CurrentDay;
        }
        if(CurrentMonth < 10){
            _CurrentMonth = '0' + CurrentMonth;
        } else {
            _CurrentMonth = CurrentMonth;
        }

        let currentDate = `${_CurrentDay}/${_CurrentMonth}/${CurrentYear}:${_CurrentHour}:${CurrentMnutes}:${CurrentSeconds}`;

        if(this.getSession(KeyUser) != null){
            if (currentDate > this.getSession(KeyUser).expire){
                //this.clearSession(KeyUser);
            } else {
                this.setSession(this.getSession(KeyUser));
            }
        }
    }

    getNameUser(KeyUser){
        if(this.getSession(KeyUser)){
            return this.getSession(KeyUser).nome;
        } else {
            return false;
        }
    }
}