// https://www.youtube.com/watch?v=mKSXd_od4Lg

var token = "677533469:AAHiQzexNX2SUcQzppc1Tgh1KLxVvQKUz_4";
var telegram_url = "https://api.telegram.org/bot" + token;
var webapp_url = "https://script.google.com/macros/s/AKfycbzwgjlMci9gYc2cRRepKd4QN1s7N_c9Z7UqxBDplXoi4yfjh-3o/exec";
var ssId = "1ukgbRsImsKSjB2pq0d4rzGsu0qSjxX5KTBpx0xCaezN4TEksp41tG1x4"

function getMe() {
  var url = telegram_url + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook(){
  var url = telegram_url + "/setWebhook?url=" + webapp_url;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function doGet(e){
  return HtmlService.createHtmlOutput("Hi there");
}

function doPost(e){
  var data_user = JSON.parse(e.postData.contents);
  var text_user = data_user.message.text;
  var id_user = data_user.message.from.id;
  var name_user = data_user.message.from.first_name + " " + data_user.message.from.last_name;
  var resposta_bot = "Hi " + name_user + ", you sayed: " + text_user;
  sendText(id, resposta_bot);
  SpreadsheetApp.openById(ssId).getSheets()[0].appendRow([new Date(), id_user, name_user, text_user, resposta_bot]);

  // GmailApp.sendEmail(Session.getEffectiveUser().getEmail(), "Mensagem enviada do bot", JSON.stringify(data, null, 4));

}

/*
{
    "parameter": {},
    "contextPath": "",
    "contentLength": 282,
    "queryString": "",
    "parameters": {},
    "postData": {
        "type": "application/json",
        "length": 282,
        "contents": "{\"update_id\":356970426,\n\"message\":{\"message_id\":29,\"from\":{\"id\":676027051,\"is_bot\":false,\"first_name\":\"Mateus\",\"last_name\":\"Bittencourt\",\"language_code\":\"en-US\"},\"chat\":{\"id\":676027051,\"first_name\":\"Mateus\",\"last_name\":\"Bittencourt\",\"type\":\"private\"},\"date\":1532449375,\"text\":\"hi\"}}",
        "name": "postData"
    }
}

{
    "update_id": 356970428,
    "message": {
        "message_id": 31,
        "from": {
            "id": 676027051,
            "is_bot": false,
            "first_name": "Mateus",
            "last_name": "Bittencourt",
            "language_code": "en-US"
        },
        "chat": {
            "id": 676027051,
            "first_name": "Mateus",
            "last_name": "Bittencourt",
            "type": "private"
        },
        "date": 1532449619,
        "text": "teste 2"
    }
}
*/
