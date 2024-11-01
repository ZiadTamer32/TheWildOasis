import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useClickOutside } from "../hooks/useClickOutside";

// Styled Components
const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// Context for Menus
const MenusContext = createContext();

function Menus({ children }) {
  const [isOpen, setIsOpen] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const close = () => setIsOpen("");
  const open = setIsOpen;

  return (
    <MenusContext.Provider
      value={{ isOpen, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

// Menus.propTypes = {
//   children: PropTypes.node.isRequired
// };

// Toggle Component
function Toggle({ id }) {
  const { isOpen, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8
    });
    isOpen === "" || isOpen !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

// Toggle.propTypes = {
//   id: PropTypes.string.isRequired
// };

// List Component
function List({ id, children }) {
  const { close } = useContext(MenusContext);
  const { isOpen, position } = useContext(MenusContext);
  const ref = useClickOutside(() => {
    close();
  }, false);

  if (isOpen !== id) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}

// List.propTypes = {
//   id: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired
// };

// Button Component
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

// Button.propTypes = {
//   children: PropTypes.node.isRequired,
//   icon: PropTypes.node, // Optional icon prop
//   onClick: PropTypes.func // Optional onClick prop
// };

// Assign components to Menus
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
