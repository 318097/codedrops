import { Modal } from "antd";

export const showPopup = ({ title, content, onOk = () => {} }) => {
  return Modal.warning({
    title,
    content,
    onOk() {
      onOk();
    },
  });
};
