function csSlackpostNew(){
  var ary = ['日','月','火','水','木','金','土']
  const baseDate = new Date;
  // console.log(typeof baseDate)
  let today = Utilities.formatDate(baseDate, 'JST', 'yyyy-MM-dd');//現在日時を取得
  // console.log(today);

  //曜日番号を取得
  //曜日番号は、日が0、月が1、火が2、水が3、木が4、金が5、土が6
  const weekNo = baseDate.getDay();
  // console.log(weekNo);

  //配列変数aryの配列番号0~6に格納された日~土の値を、変数week_numに格納した0~6の番号を使って指定することで取り出し、前後に()を付けて変数weekに代入
  const week = ary[weekNo];
  // const week = ary[6];

  if(week != '日' && week != '土' ){
    //祝日の場合、trueを返します。
    //https://moripro.net/gas-check-holiday/
    const id = 'ja.japanese#holiday@group.v.calendar.google.com'
    const cal = CalendarApp.getCalendarById(id);
    const events = cal.getEventsForDay(baseDate);
    //なんらかのイベントがある＝祝日
    if (events.length) return true;

    var mainSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let ruleSheet = mainSpreadsheet.getSheetByName('ルール');
    let eventSheet = mainSpreadsheet.getSheetByName('祝日');
    let eventDateSheet = mainSpreadsheet.getSheetByName('カレンダー');
    const eventList = eventSheet.getRange("B:B").getValues();

    for(i=0;i<eventList.length;i++){
      if(!eventList[i][0]) continue;
      let data = Utilities.formatDate(eventList[i][0], 'JST', 'yyyy-MM-dd');
        if(data === today){
          console.log("今日は祝日です");
          return; 
        }
    }

    const menbarList = ruleSheet.getRange(12,2,2,8).getValues();
    const allDataList = eventDateSheet.getRange(6,3,8,399).getValues();
    const workMemo = ruleSheet.getRange("A36").getValues();//作業メモ

    var callbody = '';
    let restList = "";
    for(n=0;n<allDataList[0].length;n++){
        if(typeof allDataList[0][n] != 'object'){
          continue;
        };
        var date = Utilities.formatDate(allDataList[0][n], 'JST', 'yyyy-MM-dd');
        if( date === today ){
          console.log(allDataList.length);
          for(m=4;m<allDataList.length;m++){
            // console.log(allDataList[m][n]);
            let menbarSlackIndex = menbarList[0].indexOf(allDataList[m][n]);
            let menbarSlackid = menbarList[1][menbarSlackIndex];

            if(!menbarSlackid){
              var menberMention = allDataList[m][0]+'：'+allDataList[m][n];
            }else{
              var menberMention = allDataList[m][0]+'：'+'<@'+menbarSlackid+'>';
            };
            console.log(menberMention);
            callbody += '\n'+menberMention;
          };

          for(m=5;m<allDataList.length;m++){
            let restTime = allDataList[m-4][0];
            let restMan = allDataList[m-4][n];
            let restItame = restTime+'：'+ restMan;
            console.log(restItame);
            restList += '\n'+restItame;
          };

        };
      };
    
    let messageBody = `
${callbody+'\n'} 
${'【作業について】\n'+workMemo+'\n'}
${'【休憩の取得方法】\n'+ restList}`
    console.log(messageBody);
    var attachmentColor = 'good';//warning
    var postData = {
      'channel': '#customer_support',
      // 'channel': 'UCBER1L57',//　久保木のみ実行

      'token': '',
      'icon_emoji' : ':office_worker:',
      // 'icon_url' : icon_url,
      // 'text': messageBody,
      'attachments': [
          {
            //参考文献：https://tmg0525.hatenadiary.jp/entry/2017/10/15/120336
            //必須項目。要約メッセージを指定する。通知やモバイル端末での表示に使われる
            "fallback": "本日のCSまとめスレッドです",
            //(ほぼ)必須項目。左のラインの色を設定する。Slackで用意されているgood、warning、dangerの３つを指定するか、カラーコード(#2E64FE)を指定する。
            // "color":"good",
            "color": attachmentColor,
            //オプション項目。アタッチメントブロック(左に線が引いてある部分)の上に表示する文//
            "pretext": '■ '+Utilities.formatDate(new Date(), 'JST', "yyyy年MM月dd日")+'('+week+')'+'　カスタマーサポート対応　スレッド',
            //authorパラメータを設定すると、著者につい手の情報をアタッチメント内の上部に小さく表示する
            //著者名のテキスト
            // "author_name": "Bobby Tables",
            //author_nameにリンクを付ける。ユーザーが存在する場合のみ有効になる。
            // "author_link": "http://flickr.com/bobby/",
            //author_nameの左側に16x16のアイコンを表示するためのURL。ユーザーが存在する場合のみ有効になる。
            // "author_icon": "http://flickr.com/icons/bobby.jpg",
            //アタッチメントボックスの先頭に太字で表示される文字。
            // "title": "Slack API Documentation",
            //有効なURLを指定すると、titleがハイパーリンクになる。
            // "title_link": "https://api.slack.com/",
            //メインテキスト。700字以上か5行以上のテキストの場合には自動的に折りたたまれる。また、標準のマークアップが使える。
            "text": messageBody,
            // "fields": [
            //     {
            //       //valueの上に太字で見出しとして表示される。マークアップを含むことはできず、エスケープ処理がされる(Macでは表示されたが、iPhoneのアプリでは絵文字が表示されなかった)。
            //       "title": "Priority",
            //       //テキスト。標準のメッセージマークアップが使える。
            //       "value": "High",
            //       //valueを横に並べられるときには横に並べる。true、falseのどちらか。
            //       "short": false
            //     }
            //   ],
            // "image_url": "http://my-website.com/path/to/image.jpg",
            // "thumb_url": "http://example.com/path/to/thumb.png",
            // "footer": "Slack API",
            // "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            // "ts": 123456789
          }
        ],
      "link_names" : 0,
      "unfurl_links" : false,//https://qiita.com/tiger_t/items/70d4b30eea46838234f4
      "username" : "カスタマーサポート_Ver2.0"
      }
    var postData　=　JSON.stringify(postData);
    var options = {
      "method" : "POST",
      "payload" : postData,
      }
    const url = 'https://hooks.slack.com/services/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';
    UrlFetchApp.fetch(url, options);

    //デリバリの作業フォルダも同時に作成しておく。
      let deliveryDay = Utilities.formatDate(baseDate, 'JST', 'yyyyMMdd');//現在日時を取得
      createDeliveryFolder(deliveryDay);

    }
}