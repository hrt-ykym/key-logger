import readline from 'readline';
import fs from 'fs/promises';
import { stdin as input, stdout as output } from 'process';

const csvFile = 'keylog.csv';
const keyLog = [];

// Configure readline
readline.emitKeypressEvents(input);
input.setRawMode(true);

console.log('キー入力ロガーを開始しました。終了するには Ctrl+C を押してください。');

// CSVヘッダーを作成して保存
async function initializeCsv() {
  const header = 'timestamp,key_combination,alt,ctrl,meta,shift\n';
  await fs.writeFile(csvFile, header);
}

// キーの組み合わせを文字列に変換
function formatKeyCombination(key, modifiers) {
  const parts = [];
  
  if (modifiers.ctrl) parts.push('Ctrl');
  if (modifiers.alt) parts.push('Alt');
  if (modifiers.meta) parts.push('Meta');
  if (modifiers.shift) parts.push('Shift');
  
  // 修飾キーが単体で押された場合
  if (!key && parts.length > 0) {
    return parts[0];
  }
  
  // キーを追加（存在する場合）
  if (key) {
    // 特殊キーは大文字で表示
    const displayKey = ['return', 'escape', 'tab', 'backspace', 'delete'].includes(key.toLowerCase())
      ? key.toUpperCase()
      : key.length === 1 ? key.toLowerCase() : key;
    parts.push(displayKey);
  }
  
  return parts.length > 0 ? parts.join('+') : key || '';
}

// キー入力のイベントハンドラー
input.on('keypress', async (str, key) => {
  if (key.ctrl && key.name === 'c') {
    await saveLog();
    process.exit();
  }

  const timestamp = Date.now();
  let keyName = key.name || str || '';

  const modifiers = {
    alt: key.alt || false,
    ctrl: key.ctrl || false,
    meta: key.meta || false,
    shift: key.shift || false
  };

  const keyCombination = formatKeyCombination(keyName, modifiers);

  const keyData = {
    timestamp,
    key_combination: keyCombination,
    ...modifiers
  };

  keyLog.push(keyData);
  console.log(`記録: ${keyData.key_combination}`);
});

// キーデータをCSV行に変換
function formatKeyData(data) {
  return `${data.timestamp},${data.key_combination},${data.alt},${data.ctrl},${data.meta},${data.shift}`;
}

// ログを保存する関数
async function saveLog() {
  try {
    await initializeCsv();
    const csvContent = keyLog.map(formatKeyData).join('\n') + '\n';
    await fs.appendFile(csvFile, csvContent);
    console.log(`\nログを ${csvFile} に保存しました。`);
  } catch (err) {
    console.error('ログの保存中にエラーが発生しました:', err);
  }
}

// 予期せぬ終了時にもログを保存
process.on('SIGINT', async () => {
  await saveLog();
  process.exit();
});