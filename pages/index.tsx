import Link from "next/link";
import { createRef, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import ModalCheckout, { ModalCheckoutRef } from "../components/ModalCheckout";

const IndexPage = () => {
	const refModalCheckout = createRef<ModalCheckoutRef>();
	const refIframe = useRef<HTMLIFrameElement>();

	useEffect(() => {
		const contentWindow = refIframe.current?.contentWindow;

		if (!contentWindow) return;

		contentWindow.onmessage = (ev) => {
			if (ev.data.type === "ON_CLICK_PRODUCT") {
				if (refModalCheckout.current) {
					refModalCheckout.current.open(ev.data.sku);
				}
			}
		};
	}, [refIframe]);

	return (
		<Layout title="Site B Sellersface">
			<div className="flex flex-col w-full">
				<h1 className="w-full mx-auto my-5 text-2xl font-bold text-center text-blue-600">
					Site B Sellersface
				</h1>

				<iframe src="/metalives/" height="800px" frameBorder="0" ref={refIframe} />
			</div>
			<ModalCheckout ref={refModalCheckout} />
		</Layout>
	);
};

export default IndexPage;
