// 공공데이터 사이트에서 요청한 API KEY
const API_KEY ='8vfuOOy%2BDd8iAtnBp2GsCl0wLA3pDzmD7cL493sLMa1VaVaKp1agDMG%2BafV4g7igF3ZD74cFoZ21dXt3WDljag%3D%3D';

async function getData(){
    // 공공데이터 사이트에서 요청한 주소 + 참고문서 요청 메세지 (내용)
    // 불러오고자 하는 데이터를 요청 메세지에 있는 키값을 입력하여 불러오기
    const url=`http://apis.data.go.kr/B552061/frequentzoneBicycle/getRestFrequentzoneBicycle?ServiceKey=${API_KEY}&searchYearCd=2015&siDo=28&guGun=260&type=json&numOfRows=10&pageNo=1`;
    // 데이터가 도착할 때까지 기다리기 위해 await를 사용 (async 함수를 사용해야 사용가능)
    const response = await fetch(url);
    // data에 response에서 받은 데이터값을 json으로 받아 원하는 값을 넣어주기
    const data = await response.json();
    console.log("data", data);
    // locations 의 형태에 맞게 개발자 도구에서 키값을 뽑아서 사용
    const locations = data.items.item.map(spot=>[
        spot.spot_nm,spot.la_crd,spot.lo_crd
    ]);

    console.log("locations", locations)

    drawMap(locations)
}
getData()

// 구글맵에서 포인트를 찍어주는 함수 생성
function drawMap(locations) {
// 매개변수의 형태
// locations = [["지역이름",위도,경도],
//              ["지역이름",위도,경도]
//             ]

    // 맵 생성
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: new google.maps.LatLng(locations[0][1], locations[0][2]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

    const infowindow = new google.maps.InfoWindow();

    // 마커 생성
    let marker, i;
    // 로케이션 별 마크 생성
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map,
        });
        // 마크를 클릭했을 때 보여주는 정보
        google.maps.event.addListener(
            marker,
            "click",
            (function (marker, i) {
              return function () {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
              };
            })(marker, i)
          );
        }
      }