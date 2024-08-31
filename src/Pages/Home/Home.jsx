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

    // Load data from localStorage when the component mounts
    useEffect(() => {
        const storedDays = localStorage.getItem('days');
        if (storedDays) {
            setDays(JSON.parse(storedDays));
        }

        // Load stored user data
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

    // Save days data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('days', JSON.stringify(days));
    }, [days]);

    // Save user data to localStorage whenever it changes
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
                            <Selector
                                selectebel={['0', '50%', '100%']}
                                onSelect={setIsExtraTime}
                                title={"Overtime:"}
                            />
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
                    <table className={'content__table'}>
                        <thead>
                        <tr className={'content__table-header'}>
                            <th>№</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Gross / Net</th>
                            <th>Type</th>
                            <th>Salary</th>
                            <th>Date</th>
                            <th>Come</th>
                            <th>Leave</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {days.map((day) => {
                            const workTime = day.workTime || 0; // Work time or 0 if we don't have;
                            const breakTime = day.breakTime || 0; // Break time or 0 if we don't have;
                            const typeSalary = day.type === 'Hour' ? `${day.salary}` : `${(day.salary / (day.days * 8))}` // Salary a hour or monthly;
                            const daySalary = typeSalary * (workTime - breakTime); // Salary a day;

                            const extraTimePercentage = parseInt(day.extraTime, 10) / 100;
                            const extraSalary = (() => {
                                switch (extraTimePercentage) {
                                    case 0:
                                        return 0; //Overtime free;

                                    case 0.5:
                                        return workTime > 8 ? (workTime - 8) * daySalary * 0.5 : 0; //Overtime 50%;

                                    case 1:
                                        return workTime * (daySalary * 2); //Overtime 100%;

                                    default:
                                        return 0;
                                }
                            })();
                            const totalSalary = daySalary + extraSalary; // Загальна зарплата
                            const netSalary = day.value === 'Netto' ? totalSalary * 0.77 : totalSalary; // Податок 23%

                            return (
                                <tr key={day.id} className={'content__table-body'}>
                                    <td>{day.id}</td>
                                    <td>{day.firstName}</td>
                                    <td>{day.lastName}</td>
                                    <td>{day.value}</td>
                                    <td>{day.type}</td>
                                    <td>{day.salary ? `${day.salary} zł` : ''}</td>
                                    <td>{day.day}</td>
                                    <td>{day.came}</td>
                                    <td>{day.went}</td>
                                    <td>{netSalary ? `${netSalary.toFixed(2)} zł` : '0 zł'}</td>
                                    <td>
                                        <button className={'content__btn'} onClick={() => handelDelete(day.id)}>X</button>
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
