import { useState } from 'react';

export const useDropdown = () => {
    const [isDropdownShowing, setIsDropdownShowing] = useState(false);

    const onShowDropdown = (
        options: () => Promise<OpenFin.ShowPopupMenuOptions>,
        onSelect: (data: unknown) => void
    ) => {
        return async (event: React.MouseEvent) => {
            const { bottom, left } =
                event && event.currentTarget ? event.currentTarget.getBoundingClientRect() : { bottom: 0, left: 0 };

            const opts = await options();

            const handleResult = (res: OpenFin.MenuResult) => {
                setIsDropdownShowing(false);
                if (res.result !== 'closed') {
                    onSelect(res.data);
                }
            };

            setIsDropdownShowing(true);
            const window = fin.Window.getCurrentSync();
            const menuResult = await window.showPopupMenu({ ...opts, x: left, y: bottom + 4 });
            handleResult(menuResult);
        };
    };

    return { isDropdownShowing, onShowDropdown };
};
