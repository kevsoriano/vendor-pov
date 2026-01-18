import type React from "react";
import "./NotificationBanner.css";
import { useEffect, useState } from "react";

export type NotificationType = "success" | "error" | "info";

interface Props {
	message: string;
	type?: NotificationType;
	onClose?: () => void;
}

const NotificationBanner: React.FC<Props> = ({ message, type = "info", onClose }) => {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		// 1. Set the timer
		const timer = setTimeout(() => {
			setIsVisible(false); // Change state after 3 seconds
		}, 3000);

		// 2. Cleanup function (Crucial to prevent memory leaks)
		return () => clearTimeout(timer);
	}, []); // Empty array means this runs once on mount

	return (
		isVisible && (
			<output className={`np-banner np-${type}`} aria-live="polite">
				<div className="np-message">{message}</div>
				<button
					type="button"
					className="np-close"
					aria-label="Dismiss notification"
					onClick={onClose}
				>
					×
				</button>
			</output>
		)
	);
};

export default NotificationBanner;
