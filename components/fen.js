
export const init = (divId, store) => {

    store.subscribe(() => {
        let { current } = store.getState()

        let fendiv = document.getElementById(divId)
        fendiv.innerHTML = ''
        fendiv.appendChild(document.createTextNode(current.fen))
    })
}

export default { init }