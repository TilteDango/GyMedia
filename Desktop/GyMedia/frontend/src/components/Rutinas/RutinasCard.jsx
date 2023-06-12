import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import moment from "moment";
import es from "moment/locale/es.js";
import Testing from "./Testing";
import { PostContext } from "../../Context/PostContext";

export default function RutinasCard({ exercice }) {
  const { getUserInfo } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const { getAllExercicesPost } = useContext(PostContext);
  const [exercicie, setExercice] = useState([]);

  const handleClick = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  useEffect(() => {
    async function getInfo() {
      const userInfo = await getUserInfo(exercice.creator);
      setUserInfo(userInfo);
      const exercices = await getAllExercicesPost(exercice._id);
      setExercice(exercices);
    }
    getInfo();

    var monthsShortDot =
        "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split(
          "_"
        ),
      monthsShort = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split(
        "_"
      ),
      monthsParse = [
        /^ene/i,
        /^feb/i,
        /^mar/i,
        /^abr/i,
        /^may/i,
        /^jun/i,
        /^jul/i,
        /^ago/i,
        /^sep/i,
        /^oct/i,
        /^nov/i,
        /^dic/i,
      ],
      monthsRegex =
        /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

    moment.locale(
      moment.locale("fr", {
        months:
          "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split(
            "_"
          ),
        monthsShort: function (m, format) {
          if (!m) {
            return monthsShortDot;
          } else if (/-MMM-/.test(format)) {
            return monthsShort[m.month()];
          } else {
            return monthsShortDot[m.month()];
          }
        },
        monthsRegex: monthsRegex,
        monthsShortRegex: monthsRegex,
        monthsStrictRegex:
          /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
        monthsShortStrictRegex:
          /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
        monthsParse: monthsParse,
        longMonthsParse: monthsParse,
        shortMonthsParse: monthsParse,
        weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split(
          "_"
        ),
        weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
        weekdaysParseExact: true,
        longDateFormat: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY H:mm",
          LLLL: "dddd, D [de] MMMM [de] YYYY H:mm",
        },
        calendar: {
          sameDay: function () {
            return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
          },
          nextDay: function () {
            return "[mañana a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
          },
          nextWeek: function () {
            return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
          },
          lastDay: function () {
            return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
          },
          lastWeek: function () {
            return (
              "[el] dddd [pasado a la" +
              (this.hours() !== 1 ? "s" : "") +
              "] LT"
            );
          },
          sameElse: "L",
        },
        relativeTime: {
          future: "en %s",
          past: "hace %s",
          s: "unos segundos",
          ss: "%d segundos",
          m: "un minuto",
          mm: "%d minutos",
          h: "una hora",
          hh: "%d horas",
          d: "un día",
          dd: "%d días",
          w: "una semana",
          ww: "%d semanas",
          M: "un mes",
          MM: "%d meses",
          y: "un año",
          yy: "%d años",
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
          dow: 1, // Monday is the first day of the week.
          doy: 4, // The week that contains Jan 4th is the first week of the year.
        },
        invalidDate: "Fecha inválida",
      })
    );
  }, []);
  return (
    <>
      <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
        <img
          src={exercice.image_path}
          className="aspect-video w-full object-cover"
          alt=""
        />
        <div className="p-4">
          <p className="mb-1 text-sm text-primary-500">
            @{userInfo.username} •
            <time>{" " + moment(exercice.createdAt).fromNow()}</time>
          </p>
          <h3 className="text-xl font-medium text-gray-900">{exercice.name}</h3>
          <p className="mt-1 text-gray-500">{exercice.description}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {exercice.categories.map((categorie) => (
              <span className="inline-flex items-center justify-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                <span className="text-center">{categorie}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
