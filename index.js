const { Keyboard, VK, getRandomId, builder, Context, MessageContext } = require('vk-io')
const { HearManager } = require('@vk-io/hear')
const fs = require('fs');
const hearManager = new HearManager('<MessageContext>')

const vk = new VK({
    token: "vk1.a.RFDqFcWuswev4sVGALmyDZVqgVsYoGWQiCi3SA4M5mqZ41i9VucVewcEdRfpZbhQeRnVnaf1WSIslBDampAJT1_5bRY5GSAlAQIWZr3l1K5dTHb1MpWNlYW-pi4U-5-LiX6VEKqyNAwtX8PH-0uP8m4fmE1xpzWxtTVJztg15ZtSGre04NLbP5HTGtb2wUgW8PlI6x56wdsJUBFCfCV1Pw"
})

var timer = setInterval(function(){
 let date = DateToDay();
 let arr = ParseUsers('endline');
    if((date[2] == 'вт')&&(date[3] == '22')&&((date[4] >= '10')&&(date[4] <= '40'))){
        if(arr == 0){
            LineOut();
            console.log('1 st ok'); 
        }else{
            console.log('1 st bad');
        }
    }else{
        console.log('wtf ?');
    }
},1000);

const bot = new HearManager()

const IDsends = [getRandIDman(),getRandIDwoman(),getRandIDall()];

vk.updates.on('message_new', bot.middleware)

/*Фунции*/
function DateToDay(){
    let date = new Date();
    let Day = date.getDay();
    switch(Day){
    case 1:
        Day = 'пн';
    break;
    case 2:
        Day = 'вт';
    break;
    case 3:
        Day = 'ср';
    break;
    case 4:
        Day = 'чт';
    break;
    case 5:
        Day = 'пт';
    break;
    case 6:
        Day = 'сб';
    break;
    case 0:
        Day = 'вс';
    break;
    }
    let DateNow =[date.getDate(),date.getMonth(),Day,date.getHours(),date.getMinutes(),date.getSeconds()];
    return DateNow;
}

function LineToArr(message){
    let id = parseInt(message[0]+message[1]+message[2]+message[3]+message[4]+message[5]);
    if((/[0-9]/).test(id)){
        let textmsg = message.slice(7);
        switch(id){
        case IDsends[0]:
            SendSexMsg('male',textmsg);
        break;
        case IDsends[1]:
            SendSexMsg('female',textmsg);
        break;
        case IDsends[2]:
            SendAllmsg(textmsg);
        break;
        }
        return true;
    }else{
        return false;
    }
}

function getRandomID(min, max) {
    return Math.floor(Math.random() * (99999999999999 - 1)) + 1;
}

function getRandIDman() {
    return Math.floor(Math.random() * (999999 - 100000)) + 100000;
}

function getRandIDwoman() {
    return Math.floor(Math.random() * (999999 - 100000)) + 100000;
}

function getRandIDall() {
    return Math.floor(Math.random() * (999999 - 100000)) + 100000;
}

function ParseUsers(arr){
    var users = fs.readFileSync('json/'+arr+'.json');
    var user = JSON.parse(users);
    return user;
}

function SendAllmsg(message){
    user = ParseUsers('users');
    for(let id=0; id <= user.length-1;id++){
        vk.api.messages.send({user_id: user[id].ID, random_id: getRandomID(), message: message})
    }
}

function CheckUser(userid, name, family, sex, code){
    var user = ParseUsers('users');
    let CheckUserCode = 0;
    for(let id = 0; id <= user.length-1; id++){
        if(user[id].ID == userid){
            let info = [user[id].ID, user[id].Sex, user[id].Name, user[id].SName, user[id].group, code];
            user[id] = {ID: info[0], Sex: info[1], Name: info[2], SName: info[3], group: info[4], lastmove: info[5]};
            fs.writeFileSync('json/users.json', JSON.stringify(user, null, 2), finished);
            function finished(err){
                console.log('err adduser in JSON with addrep.js');
            }
            CheckUserCode++;
        }
    }
    if(CheckUserCode == 0){
            /*юзер нет в бд*/
            let log = 'Секундочку, знаешь этого штриха ? vk.com/id'+userid+' , проверь на всякий, это '+family+' '+name;
            console.log(log);
            let users = fs.readFileSync('json/users.json');
            let useradd = JSON.parse(users);
            if(sex == 1){
                sex = 'female';
            }else{
                sex = 'male';
            }
            useradd[useradd.length] = {ID: userid, Sex: sex, Name: name, SName: family, group: 'user', lastmove: code};
            fs.writeFileSync('json/users.json', JSON.stringify(useradd, null, 2), finished);
            function finished(err){
                console.log('err adduser in JSON with addrep.js');
            }
    } 
}

function FindUser(userid){
    let find = 0;
    for(let id = 0; id <= user.length-1; id++){
        if(user[id].ID == userid){
           return true;
           find++;
        }
        if(find == 0){
            return false;
        }
    }
}

function SendSexMsg(gender,message){
    user = ParseUsers('users');
    for(let id=0; id <= user.length-1;id++){
        if(user[id].Sex == gender){
            vk.api.messages.send({user_id: user[id].ID, random_id: getRandomID(), message: message})
        }
    }
}

function SendIdMsg(Id,message){
    user = ParseUsers('users');
    for(let id=0; id <= user.length-1;id++){
        if(parseInt(user[id].ID) == parseInt(Id)){
            vk.api.messages.send({user_id: Id, random_id: getRandomID(), message: message})
        }
    }
}

function CheckRoot(UserID){
    let finduser = false;
    var user = ParseUsers('users');
    for(let id=0; id <= user.length-1;id++){
        if(user[id].ID == UserID){
            if(user[id].group == 'admin'){
                return true;
            }else{
                return false;
            }
        }
    } 
}

function LineOut(){
    var users = ParseUsers('users');
    var users1 = ParseUsers('onework');
    var users2 = ParseUsers('twoworks');
    var users3 = ParseUsers('threeworks');
    var users4 = ParseUsers('fourworks');
    var users5 = ParseUsers('NOline');
    var out = ParseUsers('endline');
    if(users1.length != 0){
        for(let id = 0; id <= users1.length-1; id++){
            out[out.length+id] = users1[id];
        }
    }
    if(users1.length != 0){
        for(let id = 0; id <= users2.length-1; id++){
            out[out.length+id] = users2[id];
        }
    }
    if(users1.length != 0){
        for(let id = 0; id <= users3.length-1; id++){
            out[out.length+id] = users3[id];
        }
    }
    if(users1.length != 0){
        for(let id = 0; id <= users4.length-1; id++){
            out[out.length+id] = users4[id];
        }
    }
    if(users1.length != 0){
        for(let id = 0; id <= users5.length-1; id++){
            out[out.length+id] = users5[id];
        }
    }
    users1 = [];
    users2 = [];
    users3 = [];
    users4 = [];
    users5 = [];
    fs.writeFileSync('json/onework.json', JSON.stringify(users1, null, 2), finished);
    function finished(err){
        console.log('err adduser in JSON with addrep.js');
    } 
    fs.writeFileSync('json/twoworks.json', JSON.stringify(users2, null, 2), finished);
    function finished(err){
        console.log('err adduser in JSON with addrep.js');
    } 
    fs.writeFileSync('json/threeworks.json', JSON.stringify(users3, null, 2), finished);
    function finished(err){
        console.log('err adduser in JSON with addrep.js');
    } 
    fs.writeFileSync('json/fourworks.json', JSON.stringify(users4, null, 2), finished);
    function finished(err){
        console.log('err adduser in JSON with addrep.js');
    }
    fs.writeFileSync('json/NOline.json', JSON.stringify(users5, null, 2), finished);
    function finished(err){
        console.log('err adduser in JSON with addrep.js');
    } 
    fs.writeFileSync('json/endline.json', JSON.stringify(out, null, 2), finished);
    function finished(err){
        console.log('err adduser in JSON with addrep.js');
    }
    let text = 'Итоги <br>';
    console.log(users[1].ID);
    if(out == 0){
        for(let idout = 0; idout <= out.length; idout++){
            for(let idusers = 0; idusers <= users.length; idusers++){
                if(out[idout].ID == users[idusers].ID){
                    text = text + idout + ".  "+ users[idusers].SName + " " + users[idusers].Name + '<br>';
                }
            }
        }
        console.log(text);
    }else{
        console.log('whaa ?');
    }
}

function RaspOut(id){
    msg = 'NONE';
    SendIdMsg(id,'нету ещё, не-ту');
}

function CheckLastMove(UserID){
    user = ParseUsers('users');
    for(let id = 0; id <= user.length-1; id++){
        if(user[id].ID == UserID){
            return user[id].lastmove;
        }
    }
}

function CheckLines(UserID){
    let users1 = ParseUsers('onework');
    let users2 = ParseUsers('twoworks');
    let users3 = ParseUsers('threeworks');
    let users4 = ParseUsers('fourworks');
    let users5 = ParseUsers('NOline');
    let verify = 0;
    if(users1 != 0){
        for(let id = 0; id<= users1.length-1;id++){
            if(users1[id].ID == UserID){
                verify++;
            }
        }
    }
    if(users2 != 0){
        for(let id = 0; id<= users2.length-1;id++){
            if(users2[id].ID == UserID){
                verify++;
            }
        }
    }
    if(users3 != 0){
        for(let id = 0; id<= users3.length-1;id++){
            if(users3[id].ID == UserID){
                verify++;
            }
        }
    }
    if(users4 != 0){
        for(let id = 0; id<= users4.length-1;id++){
            if(users4[id].ID == UserID){
                verify++;
            }
        }
    }
    if(users5 != 0){
        for(let id = 0; id<= users5.length-1;id++){
            if(users5[id].ID == UserID){
                verify++;
            }
        }
    }
        
    if(verify == 0){
        return true;
    }else{
        return false;
    }
}

function AddinLines(UserID, msg){
    let lastmove = CheckLastMove(UserID);
    console.log(lastmove);
    if(lastmove == 'RequiestYes'){
        let user = 0;
        switch(msg){
            case '1':
                user = ParseUsers('onework');
                user[user.length] = {ID: UserID};
                fs.writeFileSync('json/onework.json', JSON.stringify(user, null, 2), finished);
                console.log(UserID+'был записан в файл onework');
                function finished(err){
                    console.log('err adduser in JSON with addrep.js');
                }                
            break;
            case '2':
                user = ParseUsers('twoworks');
                user[user.length] = {ID: UserID};
                console.log(UserID+'был записан в файл twoworks');
                fs.writeFileSync('json/twoworks.json', JSON.stringify(user, null, 2), finished);
                function finished(err){
                    console.log('err adduser in JSON with addrep.js');
                }             
            break;
            case '3':
                user = ParseUsers('threeworks');
                user[user.length] = {ID: UserID};
                console.log(UserID+'был записан в файл threeworks');
                fs.writeFileSync('json/threeworks.json', JSON.stringify(user, null, 2), finished);
                function finished(err){
                    console.log('err adduser in JSON with addrep.js');
                }             
            break;
            case '4':
                user = ParseUsers('fourworks');
                user[user.length] = {ID: UserID};
                console.log(UserID+'был записан в файл fourworks');
                fs.writeFileSync('json/fourworks.json', JSON.stringify(user, null, 2), finished);
                function finished(err){
                    console.log('err adduser in JSON with addrep.js');
                }           
            break;
        }
    }
    if(lastmove == 'RequiestNo'){
        user = ParseUsers('NOline');
        user[user.length] = {ID: UserID};
        console.log(UserID+'был записан в файл NOline');
        fs.writeFileSync('json/NOline.json', JSON.stringify(user, null, 2), finished);
        function finished(err){
            console.log('err adduser in JSON with addrep.js');
        }  
    }
}

function SaveLastMove(UserID, move){
    user = ParseUsers('users');
    for(let id = 0; id <= user.length-1; id++){
        if(user[id].ID == UserID){
            user[id].lastmove = move;
            fs.writeFileSync('json/users.json', JSON.stringify(user, null, 2), finished);
            function finished(err){
                console.log('err adduser in JSON with addrep.js');
            }
        }
    }
}

/*Keyboards*/

const main_menu = Keyboard.keyboard([
[
        Keyboard.textButton({
            label: 'Расписание',
            color: Keyboard.SECUNDARY_COLOR
        })],[//можно убрать если хочешь чтобы кнопки были | | нужно заменит ],[ на ,
        Keyboard.textButton({
            label: 'Очередь',
            color: Keyboard.SECUNDARY_COLOR
        })
    ]
]);

const Question_Yes_or_Not = Keyboard.keyboard([
[
        Keyboard.textButton({
            label: 'Да',
            color: Keyboard.SECUNDARY_COLOR
        })],[//можно убрать если хочешь чтобы кнопки были | | нужно заменит ],[ на ,
        Keyboard.textButton({
            label: 'Нет',
            color: Keyboard.SECUNDARY_COLOR
        })
    ]
]);

const Question_How_Much = Keyboard.keyboard([
[
        Keyboard.textButton({
            label: '1',
            color: Keyboard.SECUNDARY_COLOR
        }),
        Keyboard.textButton({
            label: '2',
            color: Keyboard.SECUNDARY_COLOR
        })],[
        Keyboard.textButton({
            label: '3',
            color: Keyboard.SECUNDARY_COLOR
        }),
        Keyboard.textButton({
            label: '4',
            color: Keyboard.SECUNDARY_COLOR
        })
    ]
]);

const main_menu_admins = Keyboard.keyboard([
[
        Keyboard.textButton({
            label: 'Рассылка',
            color: Keyboard.SECUNDARY_COLOR
        })],[//можно убрать если хочешь чтобы кнопки были | | нужно заменит ],[ на ,
        Keyboard.textButton({
            label: 'Редактировать Очередь',
            color: Keyboard.SECUNDARY_COLOR
        })
    ]
]);

const send_msg = Keyboard.keyboard([
[
        Keyboard.textButton({
            label: 'Отправить всем девушкам',
            color: Keyboard.SECUNDARY_COLOR
        }),
        Keyboard.textButton({
            label: 'Отправить всем парням',
            color: Keyboard.SECUNDARY_COLOR
        })
        ],[//можно убрать если хочешь чтобы кнопки были | | нужно заменит ],[ на ,
        Keyboard.textButton({
            label: 'Отправить всем',
            color: Keyboard.SECUNDARY_COLOR
        })
    ]
]);

/*команды бота*/

bot.hear(/^[а-яА-Яa-zA-Z0-9\s?!,.'Ёё]+$/, async(msg) => {
    let code = 'ok';
    {
        if(((/привет/i).test(msg.text)) || ((/hellow/i).test(msg.text)) || ((/ghbdtn/i).test(msg.text)) || ((/меню/i).test(msg.text))){
            code = 'menu';
        }  //code menu +//

        if(((/Расписание/i).test(msg.text)) || ((/hfcgbcfybt/i).test(msg.text))){
            code = 'rasp_menu';
        }  //code rasp +func//

        if(((/Очередь/i).test(msg.text)) || ((/jxthtlm/i).test(msg.text))){
            code = 'line';
        }  //code line +func//

        if((msg.text == '1')||(msg.text == '2')||(msg.text == '3')||(msg.text == '4')||(msg.text == '5')){
            code = 'AddinLine';
        }
        if(msg.text == 'Да'){
            code = 'RequiestYes';
        }
        if(msg.text == 'Нет'){
            code = 'RequiestNo';
        }
        /* Админ часть*/

        if(((/adm/i).test(msg.text)) || ((/admin/i).test(msg.text))){
            code = 'admin_pannel';
        }//code admin_pannel =//

        if(("Рассылка" == msg.text) || ((/hfccskrf/i).test(msg.text))){
            code = 'send_menu';
        } //code send//

        if(((/Редактировать.очередь/i).test(msg.text)) || ((/htlfrnbhjdfn.jxthtlm/i).test(msg.text))){
            code = 'line_edit';
        }  //code line_edit +func//

        if(('Отправить всем девушкам' == msg.text) || ((/Jnghfdbnm.dctv.ltdeirfv/i).test(msg.text)) || ((/send.w/i).test(msg.text))){
            code = 'send_w';
        }//code send_w//

        if(('Отправить всем парням' == msg.text) || ((/Jnghfdbnm.dctv.gfhyzv/i).test(msg.text)) || ((/send.m/i).test(msg.text))){
            code = 'send_m';
        } //code send_m//

        if(('Отправить всем' == msg.text) || ((/Jnghfdbnm.dctv/i).test(msg.text)) || ((/send.all/i).test(msg.text))){
            code = 'send_all';
        }

        if(code == 'ok'){
           code = 'err'; 
        }
    } //code  sand_all//

    var check_root = CheckRoot(msg.senderId);

    {
        switch(code){
        case 'menu':
            msg.send({
                message: 'Шо надо ?',
                keyboard: main_menu.oneTime()
            });
        break;
        case 'rasp_menu':
            msg.send({
                message: 'Расписание 📅',
                keyboard: main_menu.oneTime()
            });
            RaspOut(msg.senderId);
        break;
        case 'line':
            let date = DateToDay();
            if((date[2] == 'вс')&&((date[3] >= '12')&&(date[3] <= '23'))){
                time = true;
            }else{
                time = false;
            }
            if(CheckLines(msg.senderId) == true){
                switch(time){
                    case true:
                        msg.send({
                            message: 'Очередь 🙋‍<br>Отвечал на прошлой паре ?',
                            keyboard: Question_Yes_or_Not.oneTime()
                        });
                    break;
                    case false:
                        msg.send({
                            message: 'Не варик, запись закрыта до пятницы 12:00 😿',
                            keyboard: main_menu.oneTime()
                        });
                    break;
                }
            }else{
                msg.send({
                    message: 'Не варик, ты уже записан...',
                    keyboard: main_menu.oneTime()
                });
            }
        break;
        /*🙋‍*/
        /*Админ часть*/

        case 'admin_pannel':
            var checkroot = CheckRoot(msg.senderId);
            if(checkroot == true){
                msg.send({
                    message: 'hola',
                    keyboard: main_menu_admins.oneTime()
                });
            }else{
                msg.send({
                    message: 'ERR ты не имеешь прав'
                });
            }
        break;
        case 'send_menu':
            msg.send({
                message: 'Выбери кому ты хочешь отправить :p',
                keyboard: send_msg.oneTime()      
            });
        break;
        case 'send_all':
            var checkroot = CheckRoot(msg.senderId);
            if(checkroot == true){
                msg.send({
                    message: 'Чтобы написать всем напиши сообщение в формате<br>Key,message<br>Key: '+IDsends[2]
                });
            }else{
                msg.send({
                    message: 'ERR ты не имеешь прав',
                });
            }    
        break;
        case 'send_m':
            var checkroot = CheckRoot(msg.senderId);
            if(checkroot == true){
                msg.send({
                    message: 'Чтобы написать только парням напиши сообщение в формате<br>Key,message<br>Key: '+IDsends[1]
                });
            }else{
                msg.send({
                    message: 'ERR ты не имеешь прав',
                });
            } 
        break;
        case 'send_w':
            var checkroot = CheckRoot(msg.senderId);
            if(checkroot == true){
                msg.send({
                    message: 'Чтобы написать только девушкам напиши сообщение в формате<br>Key,message<br>Key: '+IDsends[0]
                });
            }else{
                msg.send({
                    message: 'ERR ты не имеешь прав',
                });
            } 
        break;
        case 'line_edit':
            var checkroot = CheckRoot(msg.senderId);
            if(checkroot == true){
                msg.send({
                    message: 'Редактировать список'
                });
            }else{
                msg.send({
                    message: 'ERR ты не имеешь прав',
                });
            } 
        break;

        /*системная часть*/
        case 'RequiestYes':
            msg.send({
                message: 'Сколько не сдано ?',
                keyboard: Question_How_Much.oneTime()
            });
        break;
        case 'RequiestNo':
            SaveLastMove(msg.senderId, code);
            if(CheckLines(msg.senderId) == true){
                msg.send({
                    message: 'Ля какой, Я добавил тебя в списки, жди до 22:00, я скину в автоматическом режиме итоговый список',
                    keyboard: main_menu.oneTime()
                });
                AddinLines(msg.senderId, msg.text);
            }else{
                msg.send({
                    message: 'Типа умный ? Тебе же писали, ОТВЕТ ЗАПИСАН, сука...',
                    keyboard: main_menu.oneTime()
                })
            }
        break;
        case 'AddinLine':
            if(CheckLines(msg.senderId) == true){
                msg.send({
                    message: 'Я добавил тебя в списки, жди до 22:00, я скину в автоматическом режиме итоговый список',
                    keyboard: main_menu.oneTime()
                });
                //Добавить в массив ответ от 1-4
                AddinLines(msg.senderId, msg.text);
                SaveLastMove(msg.senderId, 'main_menu');
            }else{
                msg.send({
                    message: 'Типа умный ? Тебе же писали, ОТВЕТ ЗАПИСАН, сука...',
                    keyboard: main_menu.oneTime()
                })
            }
        break;

        /*Ошибка*/

        case 'err':
            let checkmsg = LineToArr(msg.text);
            if(checkmsg == true){
                msg.send({
                    message: 'Сообщение успешно выслано'
                });
                code = 'send_msg'
            }else{
                msg.send({
                    message: 'Сорян, но пока не знаю такой команды',
                    keyboard: main_menu.oneTime()
                });
            }
        break;
        }
    } //work code

    const [user_info] = await vk.api.users.get({user_id: msg.senderId, fields: "sex"})
    CheckUser(msg.senderId, user_info.first_name, user_info.last_name, user_info.sex, code);
})

/*Лог ?*/

//SendAllmsg('ну типо я запущен, но нахуя, большой вопрос, <br> в админку ты всё равно не провалишься, прав нет <br> ну а так...');

console.log('Бот запущен');
vk.updates.start().catch(console.err)
