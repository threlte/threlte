import fs from 'node:fs'
import path from 'node:path'

const fixExtensions = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file)
    if (fs.lstatSync(fullPath).isDirectory()) {
      fixExtensions(fullPath)
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8')
      content = content.replace(/from '(\..*?)'/g, (match, p1) => `from '${p1}.js'`)
      fs.writeFileSync(fullPath, content)
    }
  })
}

fixExtensions('./dist')
