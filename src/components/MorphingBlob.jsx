import { useState, useEffect } from "react";

// Kita tambahin props `className` dan `style`
function MorphingBlob({ className }) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const randomizeStyle = () => {
      const newStyle = {
        borderRadius: `${Math.random() * 50 + 50}% ${
          Math.random() * 50 + 50
        }% ${Math.random() * 50 + 50}% ${Math.random() * 50 + 50}% / ${
          Math.random() * 50 + 50
        }% ${Math.random() * 50 + 50}% ${Math.random() * 50 + 50}%`,
        transform: `translate(${Math.random() * 100 - 50}px, ${
          Math.random() * 100 - 50
        }px) scale(${Math.random() * 0.5 + 1.2})`, // Scale-nya gw gedein dikit biar lebih asik
      };
      setStyle(newStyle);
    };

    // Panggil sekali di awal biar gak nunggu 3 detik
    randomizeStyle();

    const intervalId = setInterval(randomizeStyle, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`absolute w-[500px] h-[500px] transition-all duration-[3000ms] ease-in-out ${className}`}
      style={{
        background:
          "radial-gradient(circle at center,#61636c,rgba(94, 65, 124, 0.67))",
        // Efek blur yang kuat
        filter: "blur(100px)",
        ...style,
      }}
    />
  );
}

export default MorphingBlob;
