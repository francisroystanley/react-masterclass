import useModal from "../../hooks/useModal";
import { TModalReason } from "../../types";

import "./SocialInteractionsModal.scss";

type TProps = {
  onClose: (event: {}, reason: TModalReason) => void;
  open: boolean;
};

const SocialInteractionsModal = (props: TProps) => {
  const { onClose, open } = props;

  const body = <div>Hello!</div>;

  const onSubmit = () => {};

  const modal = useModal({
    children: body,
    title: "Add Social Interaction",
    onClose,
    onSubmit,
    open
  });

  return modal;
};

export default SocialInteractionsModal;
