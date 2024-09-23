function setTrigger() {
  const configSheet = SpreadsheetApp.getActive().getSheetByName('trigger_config');
  var configData =  configSheet.getRange(2,1,2,3).getValues();

  configSheet.getRange(2,4,2,3).clearContent();
  delTriggerAll();

  var setTriggerDetail;
  configData.forEach(function(row,index){
    if (!row[1]) {
      configSheet.getRange(2 + index,6).setValue(`[${row[0]}]の「trigger_parameter_Hour」を設定してください。`).setFontColor("red");
      return;
    };
    if (row[0] ==="設定" && !row[2]) {
      configSheet.getRange(2 + index,6).setValue(`[${row[0]}]の「trigger_parameter_Minute」を設定してください。`).setFontColor("red");
      return;
    };
    if(configData[0][1] >= configData[1][1]){
      configSheet.getRange(2 + index,6).setValue(`
      [${configData[0][0]}] ＜ [${configData[1][0]}] なるようにしてください。
      ・ [${configData[0][0]}]の「trigger_parameter_Hour」 : ${configData[0][1]}
      ・ [${configData[1][0]}]の「trigger_parameter_Hour」 : ${configData[1][1]}
      `).setFontColor("red");
      return;
    }
    
    switch(row[0]){
      case '設定':
        //トリガーの時間を設定
        const triggerDay = new Date();
        triggerDay.setDate(triggerDay.getDate() + 1)
        triggerDay.setHours(row[1]);
        triggerDay.setMinutes(row[2]); 
        ScriptApp.newTrigger("fetchAndSetEmailData")
            .timeBased()
            .at(triggerDay)
            .create();
        setTriggerDetail = `特定の日時: 実行される日時「${triggerDay}」`;
        break 
      case '予約':
        ScriptApp.newTrigger("setTrigger")
          .timeBased()
          .atHour(row[1])
          .everyDays(1)
          .create();
        setTriggerDetail = `日付ベース: 実行される時帯「${row[1]}時～${row[1]+1}時」`;
        break
      default:
        setTriggerDetail = null;
        break
    }
    let activeUser = Session.getActiveUser();
    configSheet.getRange(2 + index ,4,1,2).setValues([[setTriggerDetail,activeUser]]);
  })
}

function clearTrigger() {
  delTriggerAll();
  const configSheet = SpreadsheetApp.getActive().getSheetByName('trigger_config');
  configSheet.getRange(2,4,2,3).clearContent();
}

//すべてのトリガーを削除
function delTriggerAll() {
  const triggers = ScriptApp.getProjectTriggers();
  for(const trigger of triggers){
      ScriptApp.deleteTrigger(trigger);
  }
}