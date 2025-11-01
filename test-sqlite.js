// check-environment.js
console.log('环境检查:');
console.log('Node.js 版本:', process.version);
console.log('平台:', process.platform);
console.log('架构:', process.arch);
console.log('NODE_PATH:', process.env.NODE_PATH);

// 检查 node_modules 是否存在
const fs = require('fs');
const path = require('path');

const betterSqlite3Path = path.join(
  __dirname,
  'node_modules',
  'better-sqlite3',
);
if (fs.existsSync(betterSqlite3Path)) {
  console.log('✅ better-sqlite3 目录存在');

  // 检查绑定文件
  const bindingPaths = [
    'build/Release/better_sqlite3.node',
    'build/Debug/better_sqlite3.node',
    'lib/binding/node-v93-darwin-arm64/better_sqlite3.node',
  ];

  bindingPaths.forEach((bindingPath) => {
    const fullPath = path.join(betterSqlite3Path, bindingPath);
    if (fs.existsSync(fullPath)) {
      console.log('✅ 找到绑定文件:', bindingPath);
    } else {
      console.log('❌ 未找到绑定文件:', bindingPath);
    }
  });
} else {
  console.log('❌ better-sqlite3 目录不存在');
}
