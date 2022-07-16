import { Icon } from '@openfin/ui-library';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropdown } from '../../hooks/useDropdown';
import { Modals } from '../../model/UI';
import { selectApplications } from '../../store/slices/applications';
import { showModal } from '../../store/slices/modal';
import { getDateString } from '../../utils/getDateString';
import { launchReader } from '../../utils/launchReader';
import { HeaderButton } from '../Button/HeaderButton';

enum MenuActionNames {
    LaunchApplication = 'LaunchApplication',
    CloseAll = 'CloseAll',
    Quit = 'Quit',
    Log = 'Log',
}

interface MenuAction {
    name: MenuActionNames;
    payload: unknown;
}

export const ActionMenu: FC = () => {
    const { onShowDropdown } = useDropdown();
    const dispatch = useDispatch();
    const applications = useSelector(selectApplications);

    const handleCloseAll = () => {
        applications
            .filter((app) => app.uuid !== fin.me.uuid)
            .forEach((app) => {
                const application = fin.Application.wrapSync({ uuid: app.uuid });
                try {
                    application.quit();
                } catch {
                    console.warn(`Unable to quit Application ${app.uuid}`);
                }
            });
    };

    const dropdownOptions: OpenFin.MenuItemTemplate[] = [
        {
            label: 'Launch Application',
            data: { name: MenuActionNames.LaunchApplication },
        },
        {
            label: 'Close All Applications',
            data: { name: MenuActionNames.CloseAll },
        },
        {
            label: 'Quit Process Manager',
            data: { name: MenuActionNames.Quit },
        },
    ];

    const handleMenuResult = (result: unknown) => {
        const menuResult = result as MenuAction;
        switch (menuResult.name) {
            case MenuActionNames.LaunchApplication:
                dispatch(showModal({ type: Modals.Launch, title: 'Launch Application' }));
                break;
            case MenuActionNames.CloseAll:
                handleCloseAll();
                break;
            case MenuActionNames.Quit:
                fin.Application.getCurrentSync().quit();
                break;
            case MenuActionNames.Log:
                try {
                    const log = menuResult.payload as OpenFin.LogInfo;
                    fin.System.getLog({ name: log.name }).then((logString) => {
                        launchReader(`${log.name} [${getDateString(new Date(log.date))}]`, logString, 'ReaderIcon');
                    });
                } catch (e) {
                    console.error(`Could not load the log file (${e})`);
                }
                break;
        }
    };

    const makeDropdownOptions = async (): Promise<OpenFin.ShowPopupMenuOptions> => {
        const logList = await fin.System.getLogList();
        return {
            template: [
                ...dropdownOptions,
                {
                    label: 'Show Logs',
                    submenu: logList.map((log) => ({
                        label: `[${getDateString(new Date(log.date))}] ${log.name}`,
                        data: {
                            name: MenuActionNames.Log,
                            payload: log,
                        },
                    })),
                    data: MenuActionNames.Log,
                },
            ],
        };
    };

    return (
        <HeaderButton onClick={onShowDropdown(makeDropdownOptions, handleMenuResult)}>
            <Icon icon={'DropdownMenuIcon'} />
        </HeaderButton>
    );
};
