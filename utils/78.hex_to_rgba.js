function formatHex(hex) {
  const copy = hex.toLowerCase().slice(1)

  if (copy.length === 3) {
    return [...copy].map(item => item.repeat(2)).join('') + 'ff'
  }

  if (copy.length === 4) {
    return [...copy].map(item => item.repeat(2)).join('')
  }

  if (copy.length === 6) {
    return copy + 'ff'
  }

  return copy
}

function roundNum(num) {
  return num.toFixed(2).replace(/([.0]+$)/, '') || '0'
}

// 1. validate
// 2. normalize to 8 digits
// 3. tranform to numbers
// 4. compose the result

function hexToRgba(hex) {
  const hexReg = /^#[0-9a-fA-F]+$/

  if (![4, 5, 7, 9].includes(hex.length) || !hexReg.test(hdx)) {
    throw new Error('参数有误')
  }

  const format = formatHex(hex)
  const arr = [format.slice(0, 2), format.slice(2, 4), format.slice(4, 6), format.slice(6)]
  const [r, g, b, a] = arr.map(item => parseInt(item, 16))

  return `rgba(${r}, ${g}, ${b}, ${roundNum(a / 255)})`
}
