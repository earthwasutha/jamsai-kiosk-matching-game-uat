import { Modal } from "antd";

interface ConfirmEmailModalProps {
  email: string;
  code: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ConfirmEmailModal = ({
  email,
  code,
  isOpen,
  setIsOpen,
}: ConfirmEmailModalProps) => {
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
            กรุณาตรวจสอบ E-mail
          </div>
          <div className="text-[#858585] kiosk:text-2xl">{email}</div>
          <div className="text-sm text-[#858585]  kiosk:text-2xl">{code}</div>
        </section>
        <input
          className="px-3 py-[1em] bg-[#F66000] active:bg-[#FF7733] text-white kiosk:text-2xl rounded-[1em]"
          type="submit"
          value="ปิด"
          onClick={() => setIsOpen(false)}
        />
      </section>
    </Modal>
  );
};
