const { Keyboard, VK, getRandomId, builder, Context, MessageContext } = require('vk-io')
const { HearManager } = require('@vk-io/hear')
const fs = require('fs');
const hearManager = new HearManager('<MessageContext>')

const vk = new VK({
    token: "API Ключ"
})

var timer = setInterval(function(){
 let date = DatextoDay();
 let arr = ParseUsers('endline');
 /*send line*/
    if((date[2] == 'ср')&&(date[3] == '22')&&((date[4] >= '00')&&(date[4] <= '10'))){
        if(arr == 0){
            LineOut();
            console.log('!BOT! Bild and auto send Table');
        }
    }else{
        if(arr != 0){
            arr = [];
            fs.writeFileSync('json/endline.json', JSON.stringify(arr, null, 2), finished);
                function finished(err){
                    console.log('err adduser in JSON with addrep.js');
                }
        console.log('!BOT! clear all files');      
        }
    }
/*birthday and date*/
},120000);

const bot = new HearManager()

const IDsends = [getRandom(100000,990999),getRandom(100000,999099),getRandom(100000,999909)];

vk.updates.on('message_new', bot.middleware)

/*Фунции*/
function DatextoDay(){
let date = new Date();
Day = numtoday(date.getDay());
let DateNow =[date.getDate(),date.getMonth()+1,Day,date.getHours(),date.getMinutes(),date.getSeconds()];
return DateNow;
}

function numtoday(Day){
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
    return Day;
}

function LineToArr(message){
    let id = parseInt(message[0]+message[1]+message[2]+message[3]+message[4]+message[5]);
    if((/[0-9]/).test(id)){
        let textmsg = message.slice(7);
        switch(id){
        case IDsends[1]:
            SendSexMsg('male',textmsg);
        break;
        case IDsends[0]:
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

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function ParseUsers(arr){
    var users = fs.readFileSync('json/'+arr+'.json');
    var user = JSON.parse(users);
    return user;
}

function SendAllmsg(message){
    user = ParseUsers('users');
    for(let id=0; id <= user.length-1;id++){
        vk.api.messages.send({user_id: user[id].ID, random_id: getRandom(1, 99999999999999), message: message})
    }
}

function CheckUser(userid, name, family, sex, code, bdate){
    var user = ParseUsers('users');
    let CheckUserCode = 0;
    for(let id = 0; id <= user.length-1; id++){
        if(user[id].ID == userid){
            let info = [user[id].ID, user[id].Sex, user[id].Name, user[id].SName, user[id].group, code, bdate];
            user[id] = {ID: info[0], Sex: info[1], Name: info[2], SName: info[3], group: info[4], lastmove: info[5], birthday: bdate};
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
            useradd[useradd.length] = {ID: userid, Sex: sex, Name: name, SName: family, group: 'user', lastmove: code, birthday: bdate};
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
            vk.api.messages.send({user_id: user[id].ID, random_id: getRandom(1, 99999999999999), message: message})
        }
    }
}

function SendIdMsg(Id,message){
    user = ParseUsers('users');
    for(let id=0; id <= user.length-1;id++){
        if(parseInt(user[id].ID) == parseInt(Id)){
            vk.api.messages.send({user_id: Id, random_id: getRandom(1, 99999999999999), message: message})
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
    let users1 = ParseUsers('onework');
    let users2 = ParseUsers('twoworks');
    let users3 = ParseUsers('threeworks');
    let users4 = ParseUsers('fourworks');
    let users5 = ParseUsers('NOline');
    let out = ParseUsers('endline');
    if(users5.length != 0){
        for(let id = 0; id <= users5.length-1; id++){
            out[out.length] = {ID: users5[id].ID, Name: users5[id].Name, SName: users5[id].SName};
        }
    }//1 write NO
    if(users1.length != 0){
        for(let id = 0; id <= users1.length-1; id++){
            out[out.length] = {ID: users1[id].ID, Name: users1[id].Name, SName: users1[id].SName};
        }
    }// 2 write 1 work
    if(users3.length != 0){
        for(let id = 0; id <= users3.length-1; id++){
            out[out.length] = {ID: users3[id].ID, Name: users3[id].Name, SName: users3[id].SName};
        }
    }// 3 write 3 work
    if(users4.length != 0){
        for(let id = 0; id <= users4.length-1; id++){
            out[out.length] = {ID: users4[id].ID, Name: users4[id].Name, SName: users4[id].SName};
        }
    }//4 write 4 work
    if(users2.length != 0){
        for(let id = 0; id <= users2.length-1; id++){
            out[out.length] = {ID: users2[id].ID, Name: users2[id].Name, SName: users2[id].SName};
        }
    }//5 write 2 work
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
    let end = ParseUsers('endline');
    if(end != 0){
        for(let id = 1; id <= end.length; id++){
            text = text + id + ".  "+ end[id-1].SName + " " + end[id-1].Name + '<br>';
        }
        SendAllmsg(text);
    }else{
        console.log('gdeto oshibka...');
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

function AddinLines(UserID, msg, name, family){
    let lastmove = CheckLastMove(UserID);
    console.log(lastmove);
    if(lastmove == 'RequiestYes'){
        let user = 0;
        switch(msg){
            case '1':
                user = ParseUsers('onework');
                user[user.length] = {ID: UserID, SName: family, Name: name};
                fs.writeFileSync('json/onework.json', JSON.stringify(user, null, 2), finished);
                console.log(UserID+'был записан в файл onework');
                function finished(err){
                    console.log('err adduser in JSON with addrep.js');
                }                
            break;
            case '2':
                user = ParseUsers('twoworks');
                user[user.length] = {ID: UserID, SName: family, Name: name};
                console.log(UserID+'был записан в файл twoworks');
                fs.writeFileSync('json/twoworks.json', JSON.stringify(user, null, 2), finished);
                function finished(err){
                    console.log('err adduser in JSON with addrep.js');
                }             
            break;
            case '3':
                user = ParseUsers('threeworks');
                user[user.length] = {ID: UserID, SName: family, Name: name};
                console.log(UserID+'был записан в файл threeworks');
                fs.writeFileSync('json/threeworks.json', JSON.stringify(user, null, 2), finished);
                function finished(err){
                    console.log('err adduser in JSON with addrep.js');
                }             
            break;
            case '4':
                user = ParseUsers('fourworks');
                user[user.length] = {ID: UserID, SName: family, Name: name};
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
        user[user.length] = {ID: UserID, SName: family, Name: name};
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

function Coinflip(){
    let randnum = getRandom(0,100)
    if(randnum == getRandom(1,100)){
        return 'Ребро xD';
        //ребро
    }else{
        if(randnum%2 == 0){
            return 'Решка';
            //решка
        }else{
            return 'Орёл';
            //орел
        }
    }
}

function randnum(id, msg){
    let out = 0;
    if((/[0-9],.[0-9]/).test(msg)){
        let arr = msg.split(",");
        arr[0] = parseInt(arr[0]);
        arr[1] = parseInt(arr[1]);
        if(arr[0] != arr[1]){
            if(arr[0] < arr[1]){
                out = 'Допустим это будет = '+ getRandom(arr[0], arr[1]);  
            }else{
                out = 'Допустим это будет = '+ getRandom(arr[1], arr[0]);  
            }
        }else{
            out = 'Числа равны...';
        }
    }else{
        out = 'Что-то не так!';
    }
    SendIdMsg(id, out);
    SendIdMsg(id, main_menu);
}


/*Keyboards*/

const main_menu = Keyboard.keyboard([
[
        Keyboard.textButton({
            label: 'Очередь',
            color: Keyboard.SECUNDARY_COLOR
        })],[//можно убрать если хочешь чтобы кнопки были | | нужно заменит ],[ на ,
        Keyboard.textButton({
            label: 'Расписание',
            color: Keyboard.NEGATIVE_COLOR
        })],[//можно убрать если хочешь чтобы кнопки были | | нужно заменит ],[ на ,
        Keyboard.textButton({
            label: 'Рандом',
            color: Keyboard.SECUNDARY_COLOR
        })
    ]
]);

const Question_Yes_or_Not = Keyboard.keyboard([
[
        Keyboard.textButton({
            label: 'Да',
            color: Keyboard.POSITIVE_COLOR
        })],[//можно убрать если хочешь чтобы кнопки были | | нужно заменит ],[ на ,
        Keyboard.textButton({
            label: 'Нет',
            color: Keyboard.NEGATIVE_COLOR
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
            color: Keyboard.PRIMARY_COLOR
        }),
        Keyboard.textButton({
            label: '4',
            color: Keyboard.NEGATIVE_COLOR
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

const chetnechet = Keyboard.keyboard([
[
        Keyboard.textButton({
            label: 'Четная неделя',
            color: Keyboard.SECUNDARY_COLOR
        })
        ],[//можно убрать если хочешь чтобы кнопки были | | нужно заменит ],[ на ,
        Keyboard.textButton({
            label: 'Нечетная неделя',
            color: Keyboard.SECUNDARY_COLOR
        })
    ]
]);

const dayweek = Keyboard.keyboard([
[
        Keyboard.textButton({
            label: 'Понедельник',
            color: Keyboard.SECUNDARY_COLOR
        }),
        Keyboard.textButton({
            label: 'Вторник',
            color: Keyboard.SECUNDARY_COLOR
        })
        ],[//можно убрать если хочешь чтобы кнопки были | | нужно заменит ],[ на ,
        Keyboard.textButton({
            label: 'Среда',
            color: Keyboard.SECUNDARY_COLOR
        })
        ],[
        Keyboard.textButton({
            label: 'Четверг',
            color: Keyboard.SECUNDARY_COLOR
        }),
        Keyboard.textButton({
            label: 'Пятница',
            color: Keyboard.SECUNDARY_COLOR
        })
        ]
]);

const randomize_menu = Keyboard.keyboard([
[
        Keyboard.textButton({
            label: 'от N до M',
            color: Keyboard.SECUNDARY_COLOR
        })],[//можно убрать если хочешь чтобы кнопки были | | нужно заменит ],[ на ,
        Keyboard.textButton({
            label: 'Бросить монетку',
            color: Keyboard.SECUNDARY_COLOR
        })],[//можно убрать если хочешь чтобы кнопки были | | нужно заменит ],[ на ,
        Keyboard.textButton({
            label: 'Назад в меню',
            color: Keyboard.NEGATIVE_COLOR
        })]
]);

/*команды бота*/

bot.hear(/^[а-яА-Яa-zA-Z0-9\s?!,.'Ёё]+$/, async(msg) => {
    const [user_info] = await vk.api.users.get({user_id: msg.senderId, fields: 'sex' })
    const [user_info_bdate] = await vk.api.users.get({user_id: msg.senderId, fields: 'bdate' })
    let code = 'ok';
    {
        {
            if(((/привет/i).test(msg.text)) || ((/hellow/i).test(msg.text)) || ((/ghbdtn/i).test(msg.text)) || ((/меню/i).test(msg.text))|| ((/начать/i).test(msg.text))|| ((/старт/i).test(msg.text))){
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
            if((msg.text == 'Понедельник')&&(msg.text == 'Вторник')&&(msg.text == 'Среда')&&(msg.text == 'Четверг')&&(msg.text == 'Пятница')){
                code = 'RaspDay';
            }
            if((msg.text == 'Четная неделя')&&(msg.text == 'Нечетная неделя')){
                code = 'ChetNechet';
            }
            if((msg.text == 'Рандом')){
                code = 'Randomize';
            }
            if((msg.text == 'Бросить монетку')){
                code = 'CoinFlip';
            }
            if((msg.text == 'Назад в меню')){
                code = 'menu';
            }
            if((msg.text == 'от N до M')){
                code = 'randnuminfo';
            }
            if((/[0-9]. [0-9]/).test(msg.text)){
                code = 'randnum';
            }
        }
        /* Админ часть*/
        {
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
            RaspOut(msg.senderId);
            msg.send({
                keyboard: main_menu.oneTime()
            });
        break;
        case 'line':
            let date = DatextoDay();
            if((date[2] == 'ср')&&((date[3] >= '12')&&(date[3] < '22'))){
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
                            message: 'Не варик, запись закрыта до четверга 12:00 😿',
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
        case 'Randomize':
            msg.send({
                message: 'Можно загадать число от 0 до 10 или бросить монетку',
                keyboard: randomize_menu.oneTime()
            });
        break;
        case 'RaspDay':
            msg.send({
                message: 'Прости но я пока ещё не могу определить какая у вас неделя по счёту.<br>Тыкни чё там тебе нужно.',
                keyboard: main_menu.oneTime()//chetnechet.oneTime
            });
            /*'Расписание 📅'*/
            //сюда пихаем ответ с пн по пятницу и выводим
            //Из ласт мува надо забрать что пользователь тыкнул, чет или нечет
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
                    message: 'Ля какой, Я добавил тебя в списки, жди до 22, я скину в автоматическом режиме итоговый список',
                    keyboard: main_menu.oneTime()
                });
                AddinLines(msg.senderId, msg.text, user_info.first_name, user_info.last_name);
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
                    message: 'Я добавил тебя в списки, жди до 22:30, я скину в автоматическом режиме итоговый список',
                    keyboard: main_menu.oneTime()
                });
                //Добавить в массив ответ от 1-4
                AddinLines(msg.senderId, msg.text, user_info.first_name, user_info.last_name);
                SaveLastMove(msg.senderId, 'main_menu');
            }else{
                msg.send({
                    message: 'Типа умный ? Тебе же писали, ОТВЕТ ЗАПИСАН, сука...',
                    keyboard: main_menu.oneTime()
                })
            }
        break;
        case 'ChetNechet':
            SaveLastMove(msg.senderId, code);
            msg.send({
                message: 'На какой день тебе нужно расписание ?',
                keyboard: dayweek.oneTime()
            });
        break;
        case 'CoinFlip':
            msg.send({
                message: Coinflip(),
                keyboard: randomize_menu.oneTime()
            });
        break;
        case 'randnuminfo':
            msg.send({
                message: 'Напиши короче вот так, а я уже буду ралять<br>5, 10',
                keyboard: randomize_menu.oneTime()
            });
        break;
        case 'randnum':
            randnum(msg.senderId, msg.text);
            msg.send({
                keyboard: randomize_menu.oneTime()
            });
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

    CheckUser(msg.senderId, user_info.first_name, user_info.last_name, user_info.sex, code, user_info_bdate.bdate); //нужно переделать ! сначала проверка на существование через id а потом перекидывать сраныйм архивом данные
})

/*Лог ?*/

//SendAllmsg('ну типо я запущен, но нахуя, большой вопрос, <br> в админку ты всё равно не провалишься, прав нет <br> ну а так...');

console.log('Бот запущен');
vk.updates.start().catch(console.err)
