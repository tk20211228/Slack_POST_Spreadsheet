function createDeliveryFolder(deliveryDay) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const propData = scriptProperties.getProperties();
  const parentFolderId = propData["deliverryFolderId"]
  //格納先フォルダの有無を確認できない場合は、スクリプトを中断
  if(parentFolderId == null ){
    // Browser.msgBox('エラー',"『ファルダ格納場所』に設定されたURLでは、格納場所を見つけることができませんでした。",Browser.Buttons.OK);
    console.log("『ファルダ格納場所』に設定されたURLでは、格納場所を見つけることができませんでした。")
    return;
    };
  //フォルダIDからドライブのフォルダ情報を取得
  const parentFolder = DriveApp.getFolderById(parentFolderId);
  parentFolder.createFolder(deliveryDay);
}
