/*
 @license Copyright 2021 akumidv (https://github.com/akumidv/)
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';

function sendSignalToActiveTab (signal) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if(!tabs[0].url.includes('tradingview.com')) {
      document.getElementById('msg-text').innerHTML = 'To work with the extension, activate it on the tab with the opened <a href="https://www.tradingview.com/chart" target="_blank">Tradingview chart</a>.'
      document.getElementById('shim').style.display= 'block'
      document.getElementById('msgbx').style.display = 'block'
      return
    } else if (['testStrategy','downloadStrategyTestResults','getStrategyTemplate', 'uploadStrategyTestParameters'].includes(signal)) {
      document.getElementById('msg-text').innerHTML = 'This feature is not yet implemented in this version of the extension. Please waiting for publishing a new version or look at the development version from the <a href=" http://github.com/akumidv/tradingview-assistant-chrome-extension/">repository</a>.'
      document.getElementById('shim').style.display= 'block'
      document.getElementById('msgbx').style.display = 'block'
      return
    }
    if(signal === 'uploadStrategyTestParameters')
      chrome.runtime.sendMessage({ action: 'uploadStrategyTestParameters' })
    else
      chrome.tabs.sendMessage(tabs[0].id, {action: signal}
    //, function(response) {alert('Data deleted', response ? response.join(',') : ''); console.info(response);  window.close();}
    );
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const link = document.querySelector('div.tabs__links > a');
  if (link) // Activate first tab
    link.click();
  document.getElementById('uploadSignals').addEventListener('click', () => {
    sendSignalToActiveTab('uploadSignals')
  });
  document.getElementById('testStrategy').addEventListener('click', function () {
    sendSignalToActiveTab('testStrategy')
  });
  document.getElementById('downloadStrategyTestResults').addEventListener('click', function () {
    sendSignalToActiveTab('downloadStrategyTestResults')
  });
  document.getElementById('getStrategyTemplate').addEventListener('click', function () {
    sendSignalToActiveTab('getStrategyTemplate')
  });
  document.getElementById('uploadStrategyTestParameters').addEventListener('click', function () {
    sendSignalToActiveTab('uploadStrategyTestParameters')
  });
  document.getElementById('clearAll').addEventListener('click', function () {
    sendSignalToActiveTab('clearAll')
  });
  document.getElementById('closeMsg').addEventListener('click', function () {
    document.getElementById('shim').style.display = 'none'
    document.getElementById('msgbx').style.display = 'none';
  });
});



