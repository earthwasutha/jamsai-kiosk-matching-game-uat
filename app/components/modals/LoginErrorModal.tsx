import { Modal } from "antd";

interface LoginErrorModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const LoginErrorModal = ({
  isOpen,
  setIsOpen,
}: LoginErrorModalProps) => {
  return (
    <Modal
      open={isOpen}
      closeIcon={null}
      footer={null}
      styles={{
        content: { borderRadius: 32, padding: 0 },
      }}
    >
      <section className="flex flex-col gap-6 text-center justify-center p-6 kiosk:p-8">
        <section className="font-normal">
          <div className="text-xl kiosk:text-3xl text-[4D4D4D]">
            ไม่สามารถเข้าสู่ระบบได้
          </div>
          <div className="text-[#858585] kiosk:text-2xl">
            ข้อมูลของคุณไม่ถูกต้อง
            <br />
            กรุณาลองใหม่อีกครั้ง
          </div>
        </section>
        <input
          className="px-3 py-[1em] bg-[#F66000] active:bg-[#FF7733] text-white rounded-[1em]  kiosk:text-2xl"
          type="submit"
          value="ตกลง"
          onClick={() => setIsOpen(false)}
        />
      </section>
    </Modal>
  );
};
