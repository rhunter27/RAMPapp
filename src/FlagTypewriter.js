import React, { useEffect, useState } from "react";

const FLAG_URL = "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/626f6e";
// Replace with the hidden URL you extracted. It should return "bonfire".

export default function FlagTypewriter() {
  const [flag, setFlag] = useState(null);
  const [visible, setVisible] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(FLAG_URL)
      .then(res => res.text())
      .then(text => {
        if (!cancelled) {
          setFlag(text.trim());
          setLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!flag) return;
    let i = 0;
    const chars = Array.from(flag);
    const interval = setInterval(() => {
      setVisible(prev => [...prev, chars[i]]);
      i++;
      if (i >= chars.length) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, [flag]);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {visible.map((c, i) => (
        <li key={i}>{c}</li>
      ))}
    </ul>
  );
}