import React, { useState, useEffect, useRef } from "react";
import { Snackbar, Alert } from "@mui/material";

const Prank = () => {
  const [progress, setProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState([]); // Unified log stream
  const [isShaking, setIsShaking] = useState(false); // State for shake effect
  const [countdown, setCountdown] = useState(10); // Timer countdown (60 seconds)
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for initial Snackbar
  const [showFirstSnackbar, setShowFirstSnackbar] = useState(false); // First Snackbar
  const [showSecondSnackbar, setShowSecondSnackbar] = useState(false); // Second Snackbar
  const [showBSOD, setShowBSOD] = useState(false); // State for Blue Screen of Death
  const [showLeaveButton, setShowLeaveButton] = useState(false); // Button to leave the site
  const [isOverlayVisible, setIsOverlayVisible] = useState(false); // State for dark overlay
  const terminalRef = useRef(null);

  // Array of loading messages to simulate actions
  const loadingMessages = [
    "[INFO] Initializing connection...",
    "[INFO] Collecting user information...",
    "[WARN] Unauthorized access detected...",
    "[ERROR] System failure at sector 0x00F...",
    "[INFO] Downloading passwords...",
    "[INFO] Extracting photos and videos...",
    "[WARN] Security breach imminent...",
    "[ERROR] Deleting all user security files...",
    "[CRITICAL] Finalizing access...",
    "[HACK] Breaching firewall...",
    "[HACK] Bypassing biometric authentication...",
    "[HACK] Accessing camera feed...",
    "[HACK] Uploading virus to mainframe...",
    "[HACK] Downloading contact list...",
    "[HACK] Hijacking browser session...",
    "[HACK] Collecting keys...",
    "[HACK] Disabling antivirus...",
    "[HACK] Deploying data wipe sequence...",
    "[HACK] Rewriting bootloader...",
    "[HACK] Initiating full control protocol...",
    "[TRACE] Accessing system kernel...",
    "[LOGIN] Cracking user credentials...",
    "[EXTRACT] Dumping saved passwords...",
    "[SCAN] Detecting biometric data...",
    "[CLONE] Cloning facial recognition profiles...",
    "[INTERCEPT] Hijacking IP traffic...",
    "[INSTALL] Deploying remote backdoor...",
    "[DELETE] Removing system defenses...",
    "[UPLOAD] Sending files to command server...",
    "[INIT] Replacing system boot sequence...",
    "[BREACH] Full root access granted...",
    "[WIPE] Erasing storage drive",
    "[LOCK] Encrypting all user data...",
    "[FINALIZE] Uploading ransomware payload...",
    "[FAILSAFE] Upload done. Initiating overload...",
    "[HACK] Initiating full control protocol...",
  ];

  // Network activity messages
  const generateNetworkActivity = () => {
    const ips = ["192.168.1.1", "10.0.0.7", "172.16.254.1", "8.8.8.8"];
    const ports = [22, 80, 443, 3389];
    const randomIP = ips[Math.floor(Math.random() * ips.length)];
    const randomPort = ports[Math.floor(Math.random() * ports.length)];
    return `[NETWORK] Connection established with ${randomIP}:${randomPort}`;
  };

  // Play alarm sound when critical failure occurs
  const playAlarmSound = () => {
    const audio = new Audio("/sounds/alarm.mp3");
    audio.loop = true; // Loop the alarm sound
    audio.play();
  };

  // Trigger phone vibration
  const triggerVibration = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([100, 50, 100]); // Vibrate with a pattern
    }
  };

  // Timer to simulate "deleting all items"
  useEffect(() => {
    if (progress < 100) {
      setSnackbarOpen(true); // Show "Access Granted" Snackbar
      const interval = setInterval(() => {
        // Update progress bar
        const randomIncrement = Math.floor(Math.random() * 5) + 1; // Random increment
        setProgress((prev) => Math.min(prev + randomIncrement, 100));

        // Add terminal logs and network activity
        const randomMessageType = Math.random(); // Randomize between system actions and network activity
        let newLog = "";

        if (randomMessageType > 0.7) {
          // Add network activity log
          newLog = generateNetworkActivity();
        } else {
          // Add system action log
          const messageIndex = Math.floor((progress / 100) * loadingMessages.length);
          newLog = `[${new Date().toLocaleTimeString()}] ${loadingMessages[messageIndex]}`;
        }

        setTerminalLogs((prev) => [...prev, newLog]);

        // Trigger random beeps and vibrations
        if (Math.random() > 0.7) {
          const audio = new Audio("/sounds/beep.mp3");
          audio.play();
          triggerVibration();
        }

        // Trigger random shake effect
        if (Math.random() > 0.8) {
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 500); // Shake for 500ms
        }
      }, 500); // Update every 500ms

      return () => clearInterval(interval);
    }
  }, [progress]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0 && progress === 100) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      setIsOverlayVisible(true); // Show dark overlay
      setTimeout(() => setShowFirstSnackbar(true), 1000); // Show first Snackbar
    }
  }, [countdown, progress]);

  // Sequence of events after countdown ends
  useEffect(() => {
    if (showFirstSnackbar) {
      setTimeout(() => {
        setShowFirstSnackbar(false); // Hide first Snackbar
        setTimeout(() => setShowSecondSnackbar(true), 500); // Show second Snackbar
      }, 3000); // Wait 3 seconds
    }

    if (showSecondSnackbar) {
      setTimeout(() => {
        setShowSecondSnackbar(false); // Hide second Snackbar
        setIsOverlayVisible(false); // Hide dark overlay
        setShowBSOD(true); // Show Blue Screen of Death
      }, 3000); // Wait 3 seconds
    }

    if (showBSOD) {
      playAlarmSound(); // Start alarm sound
      setTimeout(() => {
        alert("This site is unsafe. Leave website"); // Browser-level alert
        setShowLeaveButton(true); // Show button to leave the site
      }, 5000); // Wait 5 seconds
    }
  }, [showFirstSnackbar, showSecondSnackbar, showBSOD]);

  // Auto-scroll terminal logs
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight; // Scroll to bottom
    }
  }, [terminalLogs]);

  // Prevent user from leaving the site
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Required for Chrome
      return "Critical system failure detected. Leaving now will result in data loss!";
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        alert("Critical system failure detected! Do not leave this page!");
        document.title = "⚠️ SYSTEM FAILURE!";
        triggerVibration();
      } else {
        document.title = "System Error";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black flex flex-col items-center px-4 justify-center z-50 overflow-hidden screen-overlay ${
        isShaking ? "shake-effect" : ""
      }`}
    >
      {/* Dark Overlay */}
      {isOverlayVisible && (
        <div className="fixed inset-0 bg-black opacity-90 z-40"></div>
      )}

      {/* Header */}
      {/* Progress Bar */}
      <p className="text-green-500 mt-4 text-2xl font-bold font-mono animate-pulse">
        FINISHING SETUP IN: {countdown}s
      </p>
      <div className="w-64 mt-2 bg-gray-800 rounded-full overflow-hidden shadow-lg">
        <div
          className={`h-2 bg-red-500 transition-all duration-300 ${
            progress % 10 === 0 ? "animate-pulse" : ""
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Countdown Timer */}
      

      {/* Unified Terminal Logs */}
      <div
        ref={terminalRef}
        className="mt-4 w-full h-[80vh] overflow-y-auto bg-black border border-red-500 rounded p-2 font-mono text-sm px-2"
        style={{ scrollbarWidth: "none" }} // Hide scrollbar
      >
        {terminalLogs.map((log, index) => (
          <p key={index} className={log.startsWith("[NETWORK]") ? "text-green-400" : "text-red-400"}>
            {log}
          </p>
        ))}
      </div>

      {/* First Snackbar */}
      {showFirstSnackbar && (
        <div className="fixed w-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900 text-white p-4 rounded shadow-lg z-50">
          <p className="text-sm font-bold text-center">Your files have been permanently deleted.</p>
        </div>
      )}

      {/* Second Snackbar */}
      {showSecondSnackbar && (
        <div className="fixed w-3/4  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900 text-white p-4 rounded shadow-lg z-50">
          <p className="text-sm font-bold text-center">You no longer have access to this device.</p>
        </div>
      )}

      {/* Blue Screen of Death */}
      {showBSOD && (
        <div className="fixed inset-0 bg-blue-900 flex flex-col items-center justify-center z-50 text-white px-4">
          <h1 className="text-6xl font-bold w-full text-left mb-4">:(</h1>
          <p className="text-2xl font-mono mb-4">
            Your device ran into a problem and needs to restart.
          </p>
          <p className="text-lg font-mono">
            We're collecting some error info, and then we'll restart for you.
          </p>
          <p className="text-lg font-mono mt-4 w-full text-left">(100% complete)</p>
        </div>
      )}

      {/* Leave Site Button */}
      {showLeaveButton && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-2 px-7 rounded shadow-lg cursor-pointer hover:bg-green-700 transition-colors z-50">
          <button onClick={() => window.location.href = "www.linkedin.com/in/jessica-emefa-torgbenu-banini-609765270/"}>
            Leave
          </button>
        </div>
      )}
    </div>
  );
};

export default Prank;