import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Application, Pulse } from '../model/Shapes';
import { SortField, SortOrder } from '../model/UI';
import { selectApplications, setApplications } from '../store/slices/applications';
import { submitPulse } from '../store/slices/pulse';
import { selectSortMode } from '../store/slices/sorting';
import { populateApplications } from '../utils/populateApplications';

export const useProcessPoll = (): Application[] => {
    const [unsortedApps, setUnsortedApps] = useState<Application[]>([]);
    const dispatch = useDispatch();
    const sortMode = useSelector(selectSortMode);
    const applications = useSelector(selectApplications);

    useEffect(() => {
        /**
         * Polls the system every second to update the internal application data.
         */
        const interval = setInterval(async () => {
            /**
             * Get the list of application states from the system.
             * Note: Some system level pseudo application states have no uuid, filter them out.
             */
            const appStates = (await fin.System.getAllApplications()).filter(({ uuid }) => !!uuid);

            /**
             * List of all channels, system wide.
             */
            const channelsInfo = await fin.InterApplicationBus.Channel.getAllChannels();

            /**
             * A lookup for CPU and memory usages of all running applications instantaneously.
             */
            const pulse: Pulse = {};

            /**
             * Process manager representation of the running applications.
             */
            const apps = await populateApplications(appStates, channelsInfo, pulse);

            setUnsortedApps(apps);
            dispatch(submitPulse(pulse));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const asc = sortMode.order === SortOrder.Ascending;
        const apps = [...unsortedApps];

        apps.sort((a, b) => {
            switch (sortMode.field) {
                case SortField.Cpu: {
                    return (a.cpuUsage - b.cpuUsage) * (asc ? 1 : -1);
                }
                case SortField.Memory: {
                    return (a.memUsage - b.memUsage) * (asc ? 1 : -1);
                }
                case SortField.Name: {
                    // Name sorting is always A->Z
                    return a.displayName.localeCompare(b.displayName);
                }
            }
        });

        dispatch(setApplications(apps));
    }, [unsortedApps, sortMode]);

    return applications;
};
