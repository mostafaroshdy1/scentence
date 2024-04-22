import { Component, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiAdminService } from '../../../Services/api-admin.service';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit, OnDestroy {
  chartData: any;
  chart!: Chart;

  constructor(private apiService: ApiAdminService) {}

  ngOnInit(): void {
    this.fetchData();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  fetchData(): void {
    this.apiService.countNumberOfProducts().subscribe((productData: any) => {
      this.apiService.countNumberOfProducts().subscribe((userData: any) => {
        this.apiService.countNumberOfProducts().subscribe((orderData: any) => {
          this.chartData = {
            labels: Object.keys(productData),
            datasets: [
              {
                label: 'Products',
                data: Object.values(productData),
                backgroundColor: '#9fa8da',
                borderColor: '#9fa8da',
                borderWidth: 1,
                // barPercentage: 0.5,
              },
              {
                label: 'Users',
                data: Object.values(userData),
                backgroundColor: '#f48fb1',
                borderColor: '#f48fb1',
                borderWidth: 1,
                // barPercentage: 0.5,
              },
              {
                label: 'Orders',
                data: Object.values(orderData),
                backgroundColor: '#80cbc4',
                borderColor: '#80cbc4',
                borderWidth: 1,
                // barPercentage: 0.5,
              },
            ],
          };
          this.renderChart();
        });
      });
    });
  }

  renderChart(): void {
    const ctx = document.getElementById('lineChart');
    if (!ctx) {
      console.error('Canvas element not found');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx as any, {
      type: 'bar',
      data: this.chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  handleResize(): void {
    this.renderChart();
  }
}
