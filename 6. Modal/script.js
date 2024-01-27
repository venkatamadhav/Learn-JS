const buttons = document.querySelectorAll(".show-modal")
const closebutton = document.querySelector('.close-modal')
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')

function closeModal() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}
function openModal() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
buttons.forEach(button => {
    button.addEventListener('click', openModal)
})
closebutton.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal()
    }
})