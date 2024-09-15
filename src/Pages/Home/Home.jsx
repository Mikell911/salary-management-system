import React, { useState, useEffect } from "react";
import './home.scss';
import Input from "../../Components/Input/Input";
import Selector from "../../Components/Selector/Selector";
import CheckBox from "../../Components/CheckBox/CheckBox";
import Calendar from "../../Components/Calendar/Calendar";

const Home = () => {
    const [days, setDays] = useState([]);
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userSalary, setUserSalary] = useState('');
    const [salaryType, setSalaryType] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [isDay, setIsDay] = useState('');
    const [isTimeInWork, setIsTimeInWork] = useState('');
    const [isTimeOutWork, setIsTimeOutWork] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isWorkingDays, setIsWorkingDays] = useState('');
    const [isBreak, setIsBreak] = useState(false);
    const [isExtraTime, setIsExtraTime] = useState('');
    const [isValueBreakTime, setIsValueBreakTime] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [isCheckedOvertime, setIsCheckedOvertime] = useState(false);
    const [isOvertime, setIsOvertime] = useState(false);
    const [isSelectedYear, setIsSelectedYear] = useState('')

    const Month = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const year = days.map(year => year.day.split('.')[2]);
    const uniqueYears = [...new Set(year)];

    useEffect(() => {
        const storedDays = localStorage.getItem('days');
        if (storedDays) {
            setDays(JSON.parse(storedDays));
        }

        const storedFirstName = localStorage.getItem('firstName');
        const storedLastName = localStorage.getItem('lastName');
        const storedSalary = localStorage.getItem('salary');
        const storedSalaryType = localStorage.getItem('salaryType');
        const storedPaymentType = localStorage.getItem('paymentType');

        if (storedFirstName) setUserFirstName(storedFirstName);
        if (storedLastName) setUserLastName(storedLastName);
        if (storedSalary) setUserSalary(storedSalary);
        if (storedSalaryType) setSalaryType(storedSalaryType);
        if (storedPaymentType) setPaymentType(storedPaymentType);
    }, []);

    useEffect(() => {
        localStorage.setItem('days', JSON.stringify(days));
    }, [days]);

    useEffect(() => {
        localStorage.setItem('firstName', userFirstName);
        localStorage.setItem('lastName', userLastName);
        localStorage.setItem('salary', userSalary);
        localStorage.setItem('salaryType', salaryType);
        localStorage.setItem('paymentType', paymentType);
    }, [userFirstName, userLastName, userSalary, salaryType, paymentType]);

    const handleSaveDay = (e) => {
        e.preventDefault();

        const [hourArrive, minuteArrive] = isTimeInWork.split(":").map(Number);
        const cameInWork = hourArrive + minuteArrive;
        const [hourWent, minuteWent] = isTimeOutWork.split(":").map(Number);
        const wentOutWork = hourWent + minuteWent;

        const newDay = {
            id: days.length + 1,
            firstName: userFirstName,
            lastName: userLastName,
            value: salaryType,
            type: paymentType,
            salary: userSalary,
            day: isDay,
            came: isTimeInWork,
            went: isTimeOutWork,
            break: isChecked,
            days: isWorkingDays,
            workTime: wentOutWork - cameInWork,
            breakTime: isValueBreakTime,
            extraTime: isExtraTime,
        };

        setDays([...days, newDay]);
    };

    const handleChangeFirstName = (newValue) => {
        setUserFirstName(newValue);
    };
    const handleChangeLastName = (newValue) => {
        setUserLastName(newValue);
    };
    const handleChangeSalary = (newValue) => {
        setUserSalary(newValue);
    };
    const handleChangeType = (newValue) => {
        setSalaryType(newValue);
    };
    const handleChangePaymentType = (newValue) => {
        setPaymentType(newValue);
    };
    const handelDelete = (id) => {
        const updatedDays = days.filter(day => day.id !== id);
        setDays(updatedDays);
    };

    const handleReset = () => {
        setUserFirstName('');
        setUserLastName('');
        setUserSalary('');
        setSalaryType('');
        setPaymentType('');
        setIsDay('');
        setIsTimeInWork('');
        setIsTimeOutWork('');
        setIsChecked(false);
        setIsValueBreakTime(0);
    };

    const filteredAndSortedDays = days
        .filter(day => {
            const [, monthPart, yearPart] = day.day.split('.');
            const monthIndex = parseInt(monthPart, 10) - 1;
            const year = yearPart;

            // Filter by month
            const monthFilter = selectedMonth ? Month[monthIndex] === selectedMonth : true;

            // Filter by year
            const yearFilter = isSelectedYear ? year === isSelectedYear : true;

            return monthFilter && yearFilter;
        })
        .sort((a, b) => {
            const [dayA, monthA, yearA] = a.day.split('.');
            const [dayB, monthB, yearB] = b.day.split('.');
            const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
            const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
            return dateA - dateB;
        });

    return (
        <section className={'home'}>
            <div className="container home__container">
                <h1 className={'title home__title'}>Salary</h1>
                <div className={'home__content'}>
                    <form className={'home__form'} onSubmit={handleSaveDay}>
                        <Input
                            id={'inputFirstName'}
                            type={'text'}
                            label={'First Name'}
                            onChange={handleChangeFirstName}
                            value={userFirstName}
                        />

                        <Input
                            id={'inputLastName'}
                            type={'text'}
                            label={'Last Name'}
                            onChange={handleChangeLastName}
                            value={userLastName}
                        />

                        <Input
                            type={'number'}
                            label={'zł'}
                            id={'inputSalary'}
                            onChange={handleChangeSalary}
                            value={userSalary}
                        />

                        <div className={'home__form-row'}>
                            <Selector
                                selectebel={['Gross', 'Netto']}
                                onSelect={handleChangeType}
                                title={"Value salary:"}
                                value={salaryType}
                            />

                            <Selector
                                selectebel={['Hour', 'Monthly']}
                                onSelect={handleChangePaymentType}
                                title={"Type salary:"}
                                value={paymentType}
                            />
                        </div>

                        <CheckBox
                            label={'Break time minus work time?'}
                            id={'inputCheck'}
                            checkInput={setIsChecked}
                            checkedInput={setIsBreak}
                        />
                        {isBreak &&
                            <Input
                                label={'How long your break? (0.5h or 0.7h)'}
                                type={'number'}
                                id={'inputTimeBreak'}
                                value={isValueBreakTime}
                                onChange={setIsValueBreakTime}
                            />
                        }

                        <Calendar onSelect={setIsDay} workingDays={setIsWorkingDays} />

                        <div className={'home__form-row'}>
                            <Selector
                                selectebel={["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00",
                                    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
                                    "21:00", "22:00", "23:00"]}
                                onSelect={setIsTimeInWork}
                                title={'In:'}
                            />
                            <Selector
                                selectebel={["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00",
                                    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
                                    "21:00", "22:00", "23:00"]}
                                onSelect={setIsTimeOutWork}
                                title={'Out:'}
                            />
                        </div>
                        <div>
                            <CheckBox
                                label={'Overtime:'}
                                id={'inputCheckedOvertime'}
                                checkInput={setIsCheckedOvertime}
                                checkedInput={setIsOvertime}
                            />
                            {isCheckedOvertime &&
                                <Selector
                                    selectebel={['0', '50%', '100%']}
                                    onSelect={setIsExtraTime}
                                    title={"Overtime:"}
                                />
                            }
                        </div>

                        <div className={'form__btn home__form-btn'}>
                            <button
                                type="submit"
                                className={'btn form__btn-save home__form-btn-save'}>
                                Save
                            </button>

                            <button
                                type="button"
                                className={'btn form__btn-reset home__form-btn-reset'}
                                onClick={handleReset}>
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                <div className={'content'}>
                    <div className={'flex justify-end gap-4'}>
                        <Selector
                            selectebel={Month}
                            onSelect={setSelectedMonth}
                            title={'Select month:'}
                            value={selectedMonth}
                        />
                        <Selector
                            selectebel={uniqueYears.map(year => year)}
                            onSelect={setIsSelectedYear}
                            title={'Select year:'}
                            value={isSelectedYear}
                        />
                    </div>
                    <table className={'w-full table-auto border-collapse border border-slate-500'}>
                        <caption className="caption-top">
                            Table with your hours and salary
                        </caption>
                        <thead>
                        <tr className={'content__table-header border-collapse border border-slate-500 bg-slate-300'}>
                            <th className={'border border-slate-600'}>Date</th>
                            <th className={'border border-slate-600'}>Come</th>
                            <th className={'border border-slate-600'}>Leave</th>
                            <th className={'border border-slate-600'}>Name</th>
                            <th className={'border border-slate-600'}>Surname</th>
                            <th className={'border border-slate-600'}>Salary</th>
                            <th className={'border border-slate-600'}>Type</th>
                            <th className={'border border-slate-600'}>Gross / Net</th>
                            <th className={'border border-slate-600'}>Total</th>
                            <th className={'border border-slate-600 w-5'}></th>
                        </tr>
                        </thead>
                        <tbody className={'text-center'}>
                        {filteredAndSortedDays.map((day) => {
                            const workTime = day.workTime || 0; // Work time or 0 if we don't have;
                            const breakTime = day.breakTime || 0; // Break time or 0 if we don't have;
                            const typeSalary = day.type === 'Hour' ? `${day.salary}` : `${(day.salary / (day.days * 8))}`; // Salary an hour or monthly;
                            const daySalary = typeSalary * (workTime - breakTime); // Salary a day;

                            const extraTimePercentage = parseInt(day.extraTime, 10) / 100;
                            const extraSalary = (() => {
                                switch (extraTimePercentage) {
                                    case 0:
                                        return 0; //Overtime free;

                                    case 0.5:
                                        return (workTime - 8) * (daySalary / 8) * 0.5; //Overtime 50%;

                                    case 1:
                                        return daySalary; //Overtime 100%;

                                    default:
                                        return 0;
                                }
                            })();
                            const totalSalary = daySalary + extraSalary; // Загальна зарплата
                            const netSalary = day.value === 'Netto' ? totalSalary * 0.77 : totalSalary; // Податок 23%

                            return (
                                <tr key={day.id} className={'content__table-body odd:bg-white even:bg-slate-200'}>
                                    <td className={'border border-slate-700'}>{day.day}</td>
                                    <td className={'border border-slate-700'}>{day.came}</td>
                                    <td className={'border border-slate-700'}>{day.went}</td>
                                    <td className={'border border-slate-700'}>{day.firstName}</td>
                                    <td className={'border border-slate-700'}>{day.lastName}</td>
                                    <td className={'border border-slate-700'}>{day.salary ? `${day.salary} zł` : ''}</td>
                                    <td className={'border border-slate-700'}>{day.type}</td>
                                    <td className={'border border-slate-700'}>{day.value}</td>
                                    <td className={'border border-slate-700'}>{netSalary ? `${netSalary.toFixed(2)} zł` : '0 zł'}</td>
                                    <td className={'border border-slate-700'}>
                                        <button onClick={() => handelDelete(day.id)}>
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path d="M10 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M14 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </g>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Home;
