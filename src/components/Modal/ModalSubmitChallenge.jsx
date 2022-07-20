import Modal from "./modal"

export default function ModalSubmitChallenge({ closeModal }) {
  return (
    <Modal closeModal={closeModal} titleEdit="Submit challenge">
      <input
        type="text"
        class="rounded-lg  bg-gray-1 px-4 py-3  mt-2 mb-2 text-sm w-80 focus:outline-none"
        placeholder="Github link"
      />
    </Modal>
  )
}
