import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Define the order of screens in the journey
const pathOrder = [
  '/',
  '/signup-login',
  '/otp-verification',
  '/kyc-details',
  '/document-upload',
  '/eligible-lenders',
  '/lender-profile',
  '/agreement-signing',
  '/activation-success',
];

// Page transition variants
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

const transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

export function AnimatedRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [direction, setDirection] = useState(0);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    const currentPath = location.pathname;
    const currentIndex = pathOrder.indexOf(currentPath);
    const prevIndex = pathOrder.indexOf(prevPath);

    if (currentIndex !== -1 && prevIndex !== -1) {
      setDirection(currentIndex > prevIndex ? 1 : -1);
    } else {
      setDirection(1);
    }

    setPrevPath(currentPath);
  }, [location.pathname, prevPath]);

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="w-full h-full"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {children}
    </motion.div>
  );
}
