import { v4 } from 'uuid'

export function renameFile(file: File) {
	const newFileName = v4() + '.jpg'
	const myNewFile = new File([file], newFileName, { type: file.type })
	return myNewFile
}
