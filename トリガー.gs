//正確な時間をセットする　8：30
//https://somachob.com/gas-set-trigger/
// const setTrigger = () => {
function setTrigger() {
  //トリガーの時間を設定
  const triggerDay = new Date();
  triggerDay.setDate(triggerDay.getDate() + 1)
  triggerDay.setHours(8);   //8時
  triggerDay.setMinutes(30); //30分 

  ScriptApp.newTrigger("csSlackpostNew")
      .timeBased()
      .at(triggerDay)
      .create();
};

// //指定のトリガーを削除する
// //https://somachob.com/gas-set-trigge//
// //プロジェクト内のすべてのトリガーを削除
// const deleteTrigger = () => {
//   //プロジェクトのすべてのトリガーを取得
//   const triggers = ScriptApp.getProjectTriggers();

//   //すべてのトリガーをループ処理
//   for(const trigger of triggers){
//     ScriptApp.deleteTrigger(trigger);  //トリガーの削除
//   }
// }


//https://tonari-it.com/gas-trigger-delete/
//指定のトリガーのみ削除
function delTrigger() {

  const triggers = ScriptApp.getProjectTriggers();
  for(const trigger of triggers){
    if(trigger.getHandlerFunction() == "csSlackpostNew"){
      ScriptApp.deleteTrigger(trigger);
    }
  }
  
}



