import { forwardRef, Fragment, useImperativeHandle, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export interface ModalCheckoutRef {
	open: (sku: string) => void;
	close: () => void;
}

const ModalCheckout = forwardRef<ModalCheckoutRef>(function modalCheckout(_props, ref) {
	const [isOpen, setIsOpen] = useState(false);
	const [sku, setSku] = useState<string>();

	useImperativeHandle(ref, () => ({
		open: (sku: string) => {
			setIsOpen(true);
			setSku(sku);
		},
		close: () => {
			setIsOpen(false);
		},
	}));

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" open={isOpen} className="relative z-10" onClose={() => setIsOpen(false)}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-full p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
									Checkout do item {sku}
								</Dialog.Title>
								<Dialog.Description>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											Para finalizar o checkout do item {sku}, você precisa estar logado.
										</p>
									</div>
								</Dialog.Description>
								<button
									className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
									onClick={() => setIsOpen(false)}
								>
									Finalizar
								</button>
								<button
									className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
									onClick={() => setIsOpen(false)}
								>
									Cancelar
								</button>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
});

export default ModalCheckout;
