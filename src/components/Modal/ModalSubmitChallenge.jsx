import Modal from "./modal"

export default function ModalSubmitChallenge({ closeModal }) {
  function submiteChallenge() {
    console.log("teste")
  }
  return (
    <Modal 
      closeModal={closeModal} 
      titleEdit="Submit challenge" 
      saveChanges={submiteChallenge}
    >
      <input
        type="text"
        class="rounded-lg  bg-gray-1 px-4 py-3  mt-2 mb-2 text-sm w-80 focus:outline-none"
        placeholder="Github link"
      />
    </Modal>
  )
}
