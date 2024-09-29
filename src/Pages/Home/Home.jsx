import React, { useState, useEffect } from "react";
import Input from "../../Components/Input/Input";
import Selector from "../../Components/Selector/Selector";
import Calendar from "../../Components/Calendar/Calendar";
import Button from "../../Components/Button/Button";

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
    const [isWorkingDays, setIsWorkingDays] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [isSelectedYear, setIsSelectedYear] = useState('');
    const [isUser, setIsUser] = useState(false);
    const [validationError, setValidationError] = useState(null);

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

        if (cameInWork >= wentOutWork) {
            setValidationError('Wejście nie może być później niż Wyjście');
            return;
        }
        const [dayNum, monthNum, yearNum] = isDay.split('.').map(Number);
        const selectedDate = new Date(yearNum, monthNum - 1, dayNum);
        const isSunday = selectedDate.getDay() === 0; // 0 означає неділю

        if (isSunday) {
            setValidationError('Nie można zapisać pracy na niedzielę');
            return;
        }
        setValidationError(null);
        setIsUser(true);

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
            days: isWorkingDays,
            workTime: wentOutWork - cameInWork,
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
        setIsUser(false)
        setUserFirstName('');
        setUserLastName('');
        setUserSalary('');
        setSalaryType('');
        setPaymentType('');
        setIsDay('');
        setIsTimeInWork('');
        setIsTimeOutWork('');
        setValidationError(null);
    };

    const handelCloseValid = () => {
        setValidationError(null);
    }

    const filteredAndSortedDays = days
        .filter(day => {
            const [, monthPart, yearPart] = day.day.split('.');
            const monthIndex = parseInt(monthPart, 10) - 1;
            const year = yearPart;

            const monthFilter = selectedMonth ? Month[monthIndex] === selectedMonth : true;

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
        <section>
            <div className={'container py-12 max-sm:py-2.5'}>
                <h1 className={'text-center text-5xl max-sm:text-2xl'}>Salary</h1>
                <div className={'flex flex-col items-center justify-center mt-5'}>
                    <form className={'p-10 rounded-2xl w-full max-w-sm flex flex-col items-center justify-center border border-blue-500 max-sm:p-2'} onSubmit={handleSaveDay}>
                        {isUser ? (
                            <div className={'text-sm max-sm:text-xs my-2.5'}>
                                <p>Pracownik: <span className={'font-bold text-blue-500'}>{userFirstName} {userLastName}</span></p>
                                <p>Wypłata: <span className={'font-bold text-blue-500'}>{userSalary} zł</span></p>
                                <p>Typ wypłaty: <span className={'font-bold text-blue-500'}>{salaryType}</span></p>
                                <p>Typ opłaty: <span className={'font-bold text-blue-500'}>{paymentType}</span></p>
                            </div>
                        ):(
                           <>
                               <Input
                                   id={'inputFirstName'}
                                   type={'text'}
                                   label={'Nazwisko:'}
                                   onChange={handleChangeFirstName}
                                   value={userFirstName}
                               />
                               <Input
                                   id={'inputLastName'}
                                   type={'text'}
                                   label={'Imię:'}
                                   onChange={handleChangeLastName}
                                   value={userLastName}
                               />
                               <Input
                                   type={'number'}
                                   label={'Wyplata:'}
                                   id={'inputSalary'}
                                   onChange={handleChangeSalary}
                                   value={userSalary}
                               />
                               <div className={'py-3 flex items-center justify-around w-full gap-5'}>
                                   <Selector
                                       selectebel={['Brutto', 'Netto']}
                                       onSelect={handleChangeType}
                                       title={"Typ wyplaty:"}
                                       value={salaryType}
                                   />

                                   <Selector
                                       selectebel={['Za godzinę', 'Za miesiąc']}
                                       onSelect={handleChangePaymentType}
                                       title={"Typ opłaty:"}
                                       value={paymentType}
                                   />
                               </div>
                           </>
                        )}
                        <Calendar onSelect={setIsDay} workingDays={setIsWorkingDays} />

                        <div className={'py-3 flex items-center justify-around w-full gap-5'}>
                            <Selector
                                selectebel={["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00",
                                    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
                                    "21:00", "22:00", "23:00"]}
                                onSelect={setIsTimeInWork}
                                title={'Wyjście:'}
                            />
                            <Selector
                                selectebel={["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00",
                                    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
                                    "21:00", "22:00", "23:00"]}
                                onSelect={setIsTimeOutWork}
                                title={'Wejście:'}
                            />
                        </div>

                        {validationError &&
                            <div
                                className="h-full w-full fixed top-0 left-0 bg-red-300 z-10"
                            >
                                <div className={'relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-80 h-64 border border-gray-50 bg-gray-300'}>
                                    <p>{validationError}</p>
                                    <button className={'absolute top-4 right-4'} onClick={handelCloseValid}>X</button>
                                </div>

                        </div>}

                        <div className={'w-full flex justify-around'}>
                            <Button
                                label={'Zapisz'}
                                type={'submit'}
                            />

                            <Button
                                label={'Zresetuj'}
                                type={'button'}
                                onClick={handleReset}
                            />
                        </div>
                    </form>
                </div>

                <div className={'content'}>
                    <div className={'flex justify-end gap-4 max-sm:justify-center'}>
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
                    <div className={'overflow-x-auto max-sm:text-xs'}>
                        <table className={'w-full table-auto border-collapse border border-slate-500'}>
                            <caption className="caption-top m-1">
                                Harmonogram
                            </caption>
                            <thead>
                            <tr className={'border-collapse border border-slate-500 bg-blue-500 text-white'}>
                                <th className={'border border-slate-600'}>Data:</th>
                                <th className={'border border-slate-600'}>Wyjście:</th>
                                <th className={'border border-slate-600'}>Wejście:</th>
                                <th className={'border border-slate-600'}>Ile godzin:</th>
                                <th className={'border border-slate-600'}>Nadgodziny:</th>
                                <th className={'border border-slate-600'}>Za dzień:</th>
                                <th className={'border border-slate-600 w-5'}></th>
                            </tr>
                            </thead>
                            <tbody className={'text-center'}>
                            {filteredAndSortedDays.map((day) => {
                                const workTime = day.workTime || 0;
                                const typeSalary = day.type === 'Za godzinę' ? `${day.salary}` : `${(day.salary / (day.days * 8))}`;
                                const hourlyRate = parseFloat(typeSalary);
                                const daySalary = hourlyRate * workTime;

                                const [dayNum, monthNum, yearNum] = day.day.split('.').map(Number);
                                const date = new Date(yearNum, monthNum - 1, dayNum);
                                const isSaturday = date.getDay() === 6;

                                let extraSalary = 0;

                                if (workTime > 8) {
                                    const overtimeHours = workTime - 8;
                                    extraSalary += overtimeHours * (hourlyRate * 1.5);
                                }
                                let totalSalary;
                                if (isSaturday) {
                                    totalSalary = daySalary * 2;
                                } else {
                                    totalSalary = daySalary + extraSalary;
                                }

                                const netSalary = day.value === 'Netto' ? totalSalary * 0.77 : totalSalary;

                                return (
                                    <tr key={day.id} className={'odd:bg-blue-200 hover:bg-blue-400 hover:text-white hover:cursor-pointer'}>
                                        <td className={'border border-slate-700'}>{day.day}</td>
                                        <td className={'border border-slate-700'}>{day.came}</td>
                                        <td className={'border border-slate-700'}>{day.went}</td>
                                        <td className={'border border-slate-700'}>{workTime}</td>
                                        <td className={'border border-slate-700'}>
                                            {isSaturday ? (
                                                <>
                                                    {workTime} <span className={'text-sm'}>Sobota</span>
                                                </>
                                            ) : (
                                                workTime > 8 ? workTime - 8 : 0
                                            )}
                                        </td>

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
                                );
                            })}
                            </tbody>
                            <tfoot>
                            <tr className={'bg-black font-bold text-center text-white'}>
                                <th className={'border border-slate-700'} colSpan="3">Razem:</th>
                                <td className={'border border-slate-700'}>
                                    {filteredAndSortedDays.reduce((total, day) => total + (day.workTime || 0), 0)}
                                </td>
                                <td className={'border border-slate-700'}>
                                    {filteredAndSortedDays.reduce((total, day) => {
                                        const workTime = day.workTime || 0;
                                        return total + (workTime >= 8 ? workTime - 8 : 0) + (new Date(day.day.split('.').reverse().join('-')).getDay() === 6 ? workTime : 0);
                                    }, 0)}
                                </td>
                                <td className={'border border-slate-700'}>
                                    {filteredAndSortedDays.reduce((total, day) => {
                                        const workTime = day.workTime || 0;
                                        const typeSalary = day.type === 'Za godzinę' ? `${day.salary}` : `${(day.salary / (day.days * 8))}`;
                                        const hourlyRate = parseFloat(typeSalary);
                                        const daySalary = hourlyRate * workTime;

                                        const [dayNum, monthNum, yearNum] = day.day.split('.').map(Number);
                                        const date = new Date(yearNum, monthNum - 1, dayNum);
                                        const isSaturday = date.getDay() === 6;

                                        let extraSalary = 0;

                                        if (workTime > 8) {
                                            const overtimeHours = workTime - 8;
                                            extraSalary += overtimeHours * (hourlyRate * 1.5);
                                        }
                                        let totalSalary;
                                        if (isSaturday) {
                                            totalSalary = daySalary * 2;
                                        } else {
                                            totalSalary = daySalary + extraSalary;
                                        }

                                        const netSalary = day.value === 'Netto' ? totalSalary * 0.77 : totalSalary;

                                        return total + netSalary;
                                    }, 0).toFixed(2)} zł
                                </td>
                                <td className={'border border-slate-700'}></td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
