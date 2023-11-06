// function csSlackpost(){
//   var ary = ['日','月','火','水','木','金','土']
//   let today = new Date();//現在日時を取得
//   console.log(today);

//   //曜日番号を取得
//   //曜日番号は、日が0、月が1、火が2、水が3、木が4、金が5、土が6
//   const weekNo = today.getDay();
//   console.log(weekNo);

//   //配列変数aryの配列番号0~6に格納された日~土の値を、変数week_numに格納した0~6の番号を使って指定することで取り出し、前後に()を付けて変数weekに代入
//   const week = ary[weekNo];
//   // const week = ary[6];
//   console.log(week);

//   // const date = new Date('2022/04/29');
//   // console.log(date);



//   if(week != '日' && week != '土' ){
//     console.log('実行テスト');
//     //祝日の場合、trueを返します。
//     //https://moripro.net/gas-check-holiday/
//     const id = 'ja.japanese#holiday@group.v.calendar.google.com'
//     const cal = CalendarApp.getCalendarById(id);
//     const events = cal.getEventsForDay(today);
//     //なんらかのイベントがある＝祝日
//     if (events.length) return true;

//     var mainSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
//     var mainSheet =SpreadsheetApp.getActiveSheet();
//     let ruleSheet = mainSpreadsheet.getSheetByName('ルール');
//     var memberList = ruleSheet.getRange("B12:G13").getValues();//メンバー
//     console.log(memberList);
//     console.log(memberList[0].toString());

//     let restList = ruleSheet.getRange("A20:G23").getValues();//休憩ローテーション
//     console.log(restList);
//     let callList = ruleSheet.getRange("A29:G33").getValues();//電話担当ローテーション
//     console.log(callList);
//     let workMemo = ruleSheet.getRange("A36").getValues();//作業メモ
//     console.log(workMemo);
//     var callbody = '';
//     for(n=1;n<callList.length;++n){
//       let menber= callList[n][weekNo];
//       console.log(menber);
//       let menbarIndex = memberList[0].indexOf(menber);
//       console.log(menbarIndex);
//       let menbarSlackid = memberList[1][menbarIndex];
//       console.log(menbarSlackid);
//       if(!menbarSlackid){
//         var menberMention = callList[n][0]+'：'+menber+'\n';
//       }else{
//         var menberMention = callList[n][0]+'：'+'<@'+menbarSlackid+'>';

//       }
//       console.log(menberMention);
//       callbody += '\n'+menberMention;

//     };
//     console.log(callbody);


//     // let messageBody = (`■ ${Utilities.formatDate(new Date(), 'JST', "yyyy年MM月dd日")}${'('+week+')'+'　カスタマーサポート対応　スレッド'+'\n'} 
//     let messageBody = (`
// ${callbody+'\n'} 
// ${'【作業について】\n'+workMemo+'\n'}
// ${'【休憩の取得方法】\n'+
// '　'+restList[1][0]+'：'+restList[1][weekNo]+'\n'+
// '　'+restList[2][0]+'：'+restList[2][weekNo]+'\n'+
// '　'+restList[3][0]+'：'+restList[3][weekNo]+'\n'} `)
//     console.log(messageBody);

//     var attachmentColor = 'good';//warning

//     var postData = {
//       'channel': '#customer_support',
//       // 'channel': 'UCBER1L57',//　久保木のみ実行

//       'token': '',
//       // 'icon_emoji' : ':office_worker:',
//       'icon_url' : icon_url,
//       // 'text': messageBody,
//       'attachments': [
//           {
//             //参考文献：https://tmg0525.hatenadiary.jp/entry/2017/10/15/120336
//             //必須項目。要約メッセージを指定する。通知やモバイル端末での表示に使われる
//             "fallback": "本日のCSまとめスレッドです",
//             //(ほぼ)必須項目。左のラインの色を設定する。Slackで用意されているgood、warning、dangerの３つを指定するか、カラーコード(#2E64FE)を指定する。
//             // "color":"good",
//             "color": attachmentColor,
//             //オプション項目。アタッチメントブロック(左に線が引いてある部分)の上に表示する文//
//             "pretext": '■ '+Utilities.formatDate(new Date(), 'JST', "yyyy年MM月dd日")+'('+week+')'+'　カスタマーサポート対応　スレッド',
//             //authorパラメータを設定すると、著者につい手の情報をアタッチメント内の上部に小さく表示する
//             //著者名のテキスト
//             // "author_name": "Bobby Tables",
//             //author_nameにリンクを付ける。ユーザーが存在する場合のみ有効になる。
//             // "author_link": "http://flickr.com/bobby/",
//             //author_nameの左側に16x16のアイコンを表示するためのURL。ユーザーが存在する場合のみ有効になる。
//             // "author_icon": "http://flickr.com/icons/bobby.jpg",
//             //アタッチメントボックスの先頭に太字で表示される文字。
//             // "title": "Slack API Documentation",
//             //有効なURLを指定すると、titleがハイパーリンクになる。
//             // "title_link": "https://api.slack.com/",
//             //メインテキスト。700字以上か5行以上のテキストの場合には自動的に折りたたまれる。また、標準のマークアップが使える。
//             "text": messageBody,
//             //
//             // "fields": [
//             //     {
//             //       //valueの上に太字で見出しとして表示される。マークアップを含むことはできず、エスケープ処理がされる(Macでは表示されたが、iPhoneのアプリでは絵文字が表示されなかった)。
//             //       "title": "Priority",
//             //       //テキスト。標準のメッセージマークアップが使える。
//             //       "value": "High",
//             //       //valueを横に並べられるときには横に並べる。true、falseのどちらか。
//             //       "short": false
//             //     }
//             //   ],
//             // "image_url": "http://my-website.com/path/to/image.jpg",
//             // "thumb_url": "http://example.com/path/to/thumb.png",
//             // "footer": "Slack API",
//             // "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
//             // "ts": 123456789
//           }
//         ],

//       "link_names" : 0,
//       "unfurl_links" : false,//https://qiita.com/tiger_t/items/70d4b30eea46838234f4
//       "username" : "カスタマーサポート"
//       }
//     var postData　=　JSON.stringify(postData);

//     var options = {
//       "method" : "POST",
//       "payload" : postData,
//       }
    
//     const url = 'https://hooks.slack.com/services/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';
//     var postlog = UrlFetchApp.fetch(url, options);
//     }

// }