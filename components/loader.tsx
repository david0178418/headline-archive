import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";


export
function Loader() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		function handleStart(url: string) {
			(url !== router.pathname) && setLoading(true);
		}

		function handleComplete(url: string) {
			(url !== router.pathname) && setLoading(false);
		}

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleComplete);
		router.events.on('routeChangeError', handleComplete);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleComplete);
			router.events.off('routeChangeError', handleComplete);
		}
	})

	return (
		<>
			{loading && (
				<div className="loader-overlay">
					<div className="loader-spinner">
						<Spinner animation="border" variant="secondary" />
					</div>
				</div>
			)}
			<style>{`
				.loader-overlay {
					position: fixed;
					top: 0;
					let: 0;
					width: 100%;
					height: 100%;
					backdrop-filter: blur(2px);
				}

				.loader-spinner {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translateX(-50%)
				}
			`}</style>
		</>
	);
}
