import { useState, useEffect, useRef } from "react";
import { useLoading } from "../context/LoadingContext";

const useLoadingAnimation = () => {
  const { isLoading } = useLoading();
  const [animationState, setAnimationState] = useState({
    filledParts: 0,
    expand: false,
    showText: true,
    isVisible: true,
    loadingCompleted: false,
  });

  // Referência para controlar timeouts
  const timers = useRef([]);

  // Limpeza de timers ao desmontar
  useEffect(() => {
    return () => {
      timers.current.forEach((timerId) => clearTimeout(timerId));
    };
  }, []);

  // Controla o preenchimento progressivo em loop
  useEffect(() => {
    if (!animationState.isVisible || animationState.loadingCompleted) return;

    const timer = setTimeout(() => {
      setAnimationState((prev) => {
        // Reinicia após chegar em 3 (0-1-2-3-0...)
        const nextPart = prev.filledParts >= 3 ? 0 : prev.filledParts + 1;
        return { ...prev, filledParts: nextPart };
      });
    }, 500);

    timers.current.push(timer);

    return () => clearTimeout(timer);
  }, [
    animationState.filledParts,
    animationState.isVisible,
    animationState.loadingCompleted,
  ]);

  // Monitora mudanças no estado global de loading
  useEffect(() => {
    if (!isLoading) {
      // Sinaliza conclusão e força preenchimento completo
      setAnimationState((prev) => ({
        ...prev,
        loadingCompleted: true,
        filledParts: 3,
      }));
    } else {
      // Reinicia completamente para novo ciclo
      setAnimationState({
        filledParts: 0,
        expand: false,
        showText: true,
        isVisible: true,
        loadingCompleted: false,
      });
    }
  }, [isLoading]);

  // Controla a sequência final da animação
  useEffect(() => {
    if (!animationState.loadingCompleted) return;

    const timer1 = setTimeout(() => {
      setAnimationState((prev) => ({
        ...prev,
        showText: false,
        expand: true,
      }));
    }, 300);

    const timer2 = setTimeout(() => {
      setAnimationState((prev) => ({
        ...prev,
        isVisible: false,
      }));
    }, 1000);

    timers.current.push(timer1, timer2);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [animationState.loadingCompleted]);

  // Reinicia automaticamente se demorar muito (safety net)
  useEffect(() => {
    if (!isLoading) return;

    const safetyTimer = setTimeout(() => {
      if (isLoading) {
        setAnimationState((prev) => ({
          ...prev,
          filledParts: 0,
        }));
      }
    }, 5000);

    timers.current.push(safetyTimer);

    return () => clearTimeout(safetyTimer);
  }, [isLoading]);

  return {
    shouldRender: animationState.isVisible,
    animationProps: {
      filledParts: animationState.filledParts,
      expand: animationState.expand,
      showText: animationState.showText,
    },
  };
};

export default useLoadingAnimation;
